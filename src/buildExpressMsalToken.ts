import { expressjwt } from "express-jwt"
import jwksRsa, { GetVerificationKey } from "jwks-rsa"

type TokenVersion = "v1" | "v2" | "both"

/** Generate the uri where a tenant's public keys are stored */
const tenantPublicKeyUri = (tenantId: string): string =>
  `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`

// This issuer and audience are used for API scope with MSAL
const apiScopeIssuer = (tenantId: string): string =>
  `https://sts.windows.net/${tenantId}/`
const apiScopeAudience = (appId: string): string => `api://${appId}`

// This issuer and audience are used if authentication is enabled on App Service with token cache.
const appServiceIssuer = (tenantId: string): string =>
  `https://login.microsoftonline.com/${tenantId}/v2.0`
const appServiceAudience = (appId: string): string => `${appId}`

const JWKS_REQ_PER_MIN = 5
const RSA256 = "RS256"

/**
 * Build express middleware to validate a token for the application
 * given by `appId` on the tenant given by `tenantId`
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function buildExpressMsalToken(args: {
  tenantIdOrDomain: string
  appId: string
  tokenVersion: TokenVersion
}) {
  return expressjwt({
    secret: jwksRsa.expressJwtSecret({
      jwksUri: tenantPublicKeyUri(args.tenantId),
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: JWKS_REQ_PER_MIN
    }) as GetVerificationKey,
    issuer: [apiScopeIssuer(args.tenantId), appServiceIssuer(args.tenantId)],
    audience: [apiScopeAudience(args.appId), appServiceAudience(args.appId)],
    algorithms: [RSA256],
    credentialsRequired: true
  })
}
