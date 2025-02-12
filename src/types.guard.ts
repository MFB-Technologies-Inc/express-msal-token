import { OidProviderMetaMinimal } from "./types.js"

export function isOidProviderMetaMinimal(
  input: unknown
): input is OidProviderMetaMinimal {
  return (
    typeof input === "object" &&
    input !== null &&
    "issuer" in input &&
    typeof input.issuer === "string" &&
    "authorization_endpoint" in input &&
    typeof input.authorization_endpoint === "string" &&
    "jwks_uri" in input &&
    typeof input.jwks_uri === "string" &&
    "id_token_signing_alg_values_supported" in input &&
    Array.isArray(input.id_token_signing_alg_values_supported) &&
    input.id_token_signing_alg_values_supported.every(
      alg => typeof alg === "string"
    ) &&
    "response_types_supported" in input &&
    Array.isArray(input.response_types_supported) &&
    input.response_types_supported.every(type => typeof type === "string") &&
    "subject_types_supported" in input &&
    Array.isArray(input.subject_types_supported) &&
    input.subject_types_supported.every(type => typeof type === "string")
  )
}

