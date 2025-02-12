import jwksRsa from "jwks-rsa"
import { JwksUri } from "./types.js"
import type { GetVerificationKey } from "express-jwt"

export function buildGetVerificationKey(args: {
  jwksUri: JwksUri
}): GetVerificationKey {
  return jwksRsa.expressJwtSecret({
    jwksUri: args.jwksUri,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5
  }) as GetVerificationKey
}
