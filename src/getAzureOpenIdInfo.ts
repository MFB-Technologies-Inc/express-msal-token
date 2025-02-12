import { isOidProviderMetaMinimal } from "./types.guard.js"
import { Issuer, JwksUri } from "./types.js"

export async function getAzureOpenIdInfo(args: {
  tenantIdOrDomain: string
  tokenVersion: 1 | 2
}): Promise<{
  jwksUri: JwksUri
  issuer: Issuer
}> {
  const configUri = constructOpenIdConfigUri(args)
  const response = await fetch(configUri)
  const oidMeta = await response.json()
  if (!isOidProviderMetaMinimal(oidMeta)) {
    throw new Error("Did not receive valid Open ID metadata")
  }
  return {
    jwksUri: oidMeta.jwks_uri as JwksUri,
    issuer: oidMeta.issuer as Issuer
  }
}

function constructOpenIdConfigUri(args: {
  tenantIdOrDomain: string
  tokenVersion: 1 | 2
}): string {
  const { tokenVersion, tenantIdOrDomain } = args
  switch (tokenVersion) {
    case 1:
      return `https://login.microsoftonline.com/${tenantIdOrDomain}/.well-known/openid-configuration`
    case 2:
      return `https://login.microsoftonline.com/${tenantIdOrDomain}/v2.0/.well-known/openid-configuration`
    default:
      tokenVersion satisfies never
      throw new Error("Unexpected default case")
  }
}
