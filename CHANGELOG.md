# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). While the major
version is `0`, the public API may change between minor releases.

## [0.1.1] - 2026-06-22

### Changed

- Releases are now published automatically from GitHub Actions using npm OIDC
  trusted publishing. As a result, every published tarball now carries npm
  provenance / build attestations. No changes to the type definitions or
  runtime API since 0.1.0.

## [0.1.0] - 2026-06-22

Initial public release.

### Added

- 223 entity interfaces generated from Autotask's official Swagger 2.0 spec, with per-field JSDoc.
- `AUTOTASK_COLLECTIONS` runtime catalog and `ENTITY_TO_COLLECTION` mapping for all 221 typed REST collections.
- Typed query model (`AutotaskQuery`), the full filter operator set, and the `filters()` DSL.
- Response envelopes and entity-information / picklist metadata types.
- `AutotaskApi` (apigrate connector) and provider-agnostic `AutotaskTypedClient` surfaces.
- Pagination (`collectAll`, `iterateAll`), UDF helpers (`getUdf`, `toUdfArray`), and narrowing/write helpers (`requireField`, `writtenId`, `isPresent`, `isAutotaskError`).
- Webhook helpers (subpath `autotask-rest-api-types/webhooks`): typed delivery parsing, HMAC signature verification, registration plan builders, error-log parsing, and an optional router.
- `autotask-enrich` CLI (read-only) to capture instance-specific picklist values, field flags, and reference targets into a consumer-generated file.

[0.1.1]: https://github.com/aybouzaglou/autotask-rest-api-types/releases/tag/v0.1.1
[0.1.0]: https://github.com/aybouzaglou/autotask-rest-api-types/releases/tag/v0.1.0
