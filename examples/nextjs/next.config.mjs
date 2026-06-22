import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
export default {
  // This example lives inside the library repo, which has its own lockfile(s)
  // higher up. Pin the tracing root so Next doesn't infer a parent directory.
  outputFileTracingRoot: root,
};
