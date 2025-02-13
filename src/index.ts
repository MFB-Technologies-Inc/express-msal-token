import { buildMsalValidationMiddleware } from "./buildMsalValidationMiddleware.js"
import { getAzureOpenIdInfo } from "./getAzureOpenIdInfo.js"
import { Audience, MiddlewareWithRequest, RequestLike } from "./types.js"
import { buildGetVerificationKey } from "./buildGetVerificationKey.js"

export type { MsalAuth, WithMsalAuth } from "./RequestWithMsalAuth.js"
export { audienceUtils } from "./audience-utils.js"

export async function buildExpressMsalToken(args: {
  tenantIdOrDomain: string
  audience: Audience
  tokenVersion: 1 | 2
}): Promise<MiddlewareWithRequest<RequestLike>> {
  const { jwksUri, issuer } = await getAzureOpenIdInfo(args)
  const getVerificationKey = buildGetVerificationKey({
    jwksUri
  })
  return buildMsalValidationMiddleware({
    getVerificationKey,
    issuer,
    audience: args.audience
  })
}
