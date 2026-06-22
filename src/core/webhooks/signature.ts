type CryptoKeyLike = unknown;

interface SubtleCryptoLike {
  importKey(
    format: "raw",
    keyData: Uint8Array,
    algorithm: { name: "HMAC"; hash: "SHA-1" },
    extractable: false,
    keyUsages: readonly ["sign"],
  ): Promise<CryptoKeyLike>;
  sign(algorithm: "HMAC", key: CryptoKeyLike, data: Uint8Array): Promise<ArrayBuffer>;
}

interface TextEncoderLike {
  encode(input?: string): Uint8Array;
}

declare const TextEncoder: {
  new (): TextEncoderLike;
};

/** Raw request body accepted by the signature helpers. */
export type AutotaskSignatureBody = string | ArrayBuffer | Uint8Array;

/**
 * Lowercase because Fetch/Workers `Headers.get()` normalizes lookups to
 * lowercase. The documented wire header is `X-Hook-Signature`.
 */
export const AUTOTASK_SIGNATURE_HEADER = "x-hook-signature";

/** Parsed `X-Hook-Signature` value. */
export interface ParsedHookSignature {
  /** Signature algorithm. Autotask documents SHA-1 HMAC. */
  algorithm: string;
  /** Base64 digest with any `sha1=` prefix removed. */
  value: string;
}

/** Options for {@link verifyAutotaskSignature}. */
export interface VerifyAutotaskSignatureOptions {
  /**
   * Apply the reverse-engineered Autotask/n8n escaping pass before HMAC.
   *
   * This is undocumented and off by default. Use it only as a compatibility
   * fallback after testing a real callout against raw-body verification.
   */
  escapeBody?: boolean;
}

/**
 * Parse an Autotask hook signature header.
 *
 * The documented format is `sha1=BASE64`. The `algorithm=value` split is taken
 * only when `value` is itself valid base64, so a prefix-less digest that
 * happens to contain padding (e.g. a bare `"abc=="`) is not mis-split on its
 * internal `=` — it falls through to the bare-digest branch and is treated as
 * a `sha1` value. That bare branch is defensive/speculative (not an observed
 * Autotask format); it lets callers pass an already-stripped digest.
 */
export function parseHookSignature(header: string | null | undefined): ParsedHookSignature | null {
  if (typeof header !== "string") return null;
  const trimmed = header.trim();
  if (!trimmed) return null;

  const prefixed = /^([A-Za-z0-9-]+)=(.+)$/.exec(trimmed);
  if (prefixed) {
    const algorithm = prefixed[1]?.toLowerCase();
    const value = prefixed[2]?.trim();
    if (algorithm && value && isBase64(value)) {
      return { algorithm, value };
    }
  }

  return { algorithm: "sha1", value: trimmed };
}

/** Standard base64 (`+`/`/` alphabet, padding only at the end). */
function isBase64(value: string): boolean {
  return /^[A-Za-z0-9+/]+={0,2}$/.test(value);
}

/**
 * Constant-time string comparison for signatures.
 *
 * The loop covers the longer string and mixes in the length difference so
 * mismatched lengths do not return early.
 */
export function timingSafeEqualString(a: string, b: string): boolean {
  const max = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < max; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/**
 * Compute the Autotask webhook signature for a raw request body.
 *
 * ```ts
 * const expected = await computeAutotaskSignature(rawBody, secretKey);
 * // "sha1=BASE64..."
 * ```
 */
export async function computeAutotaskSignature(
  rawBody: AutotaskSignatureBody,
  secretKey: string,
): Promise<string> {
  const subtle = getSubtleCrypto();
  const key = await subtle.importKey(
    "raw",
    bytesFrom(secretKey),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const digest = await subtle.sign("HMAC", key, bytesFrom(rawBody));
  return `sha1=${base64Encode(new Uint8Array(digest))}`;
}

/**
 * Verify an Autotask webhook signature against the raw request body.
 *
 * Read the body before parsing JSON, then pass the exact bytes/string here.
 * If real traffic rejects with raw verification, retry with
 * `{ escapeBody: true }` and capture the result for your instance.
 */
export async function verifyAutotaskSignature(
  rawBody: AutotaskSignatureBody,
  secretKey: string,
  header: string | null | undefined,
  options: VerifyAutotaskSignatureOptions = {},
): Promise<boolean> {
  const parsed = parseHookSignature(header);
  if (!parsed || parsed.algorithm !== "sha1") return false;

  const body = options.escapeBody ? escapeRawBody(rawBody) : rawBody;
  const expected = parseHookSignature(await computeAutotaskSignature(body, secretKey));
  return expected ? timingSafeEqualString(parsed.value, expected.value) : false;
}

/**
 * Reverse-engineered body escaping used by some community integrations.
 *
 * This is undocumented, opt-in, and should stay off until a real Autotask
 * callout proves the raw-body HMAC does not match. The table escapes
 * ampersand, angle brackets, quotes, backtick, plus, backslash, and
 * non-ASCII code units as lower-case `\\uXXXX`.
 */
export function autotaskHmacEscape(jsonText: string): string {
  let escaped = "";
  for (let i = 0; i < jsonText.length; i += 1) {
    // `i` is bounded by the string length, so the index is always defined.
    const char = jsonText[i]!;
    const code = char.charCodeAt(0);
    switch (char) {
      case "&":
        escaped += "\\u0026";
        break;
      case "<":
        escaped += "\\u003c";
        break;
      case ">":
        escaped += "\\u003e";
        break;
      case "'":
        escaped += "\\u0027";
        break;
      case '"':
        escaped += "\\u0022";
        break;
      case "`":
        escaped += "\\u0060";
        break;
      case "+":
        escaped += "\\u002b";
        break;
      case "\\":
        escaped += "\\u005c";
        break;
      default:
        escaped += code > 0x7f ? unicodeEscape(code) : char;
        break;
    }
  }
  return escaped;
}

function escapeRawBody(rawBody: AutotaskSignatureBody): string {
  if (typeof rawBody !== "string") {
    throw new Error("verifyAutotaskSignature({ escapeBody: true }) requires a string raw body.");
  }
  return autotaskHmacEscape(rawBody);
}

function getSubtleCrypto(): SubtleCryptoLike {
  const cryptoLike = (globalThis as typeof globalThis & { crypto?: { subtle?: SubtleCryptoLike } }).crypto;
  if (!cryptoLike?.subtle) {
    throw new Error("WebCrypto SubtleCrypto is required to verify Autotask webhook signatures.");
  }
  return cryptoLike.subtle;
}

function bytesFrom(value: AutotaskSignatureBody): Uint8Array {
  if (typeof value === "string") return new TextEncoder().encode(value);
  if (value instanceof Uint8Array) return value;
  return new Uint8Array(value);
}

function unicodeEscape(code: number): string {
  return `\\u${code.toString(16).padStart(4, "0")}`;
}

function base64Encode(bytes: Uint8Array): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let out = "";
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i] ?? 0;
    const b = bytes[i + 1] ?? 0;
    const c = bytes[i + 2] ?? 0;
    const triple = (a << 16) | (b << 8) | c;
    out += alphabet[(triple >> 18) & 0x3f];
    out += alphabet[(triple >> 12) & 0x3f];
    out += i + 1 < bytes.length ? alphabet[(triple >> 6) & 0x3f] : "=";
    out += i + 2 < bytes.length ? alphabet[triple & 0x3f] : "=";
  }
  return out;
}
