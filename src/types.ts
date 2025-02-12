import { Request as RequestExpress, Response, NextFunction } from "express"

export type JwksUri = string & {
  jwksUriBrand: string
}

export type Issuer = string & {
  issuerBrand: string
}

export type Audience = string & {
  AudienceBrand: string
}

/**
 * Request-like type that is satisfied by both Express v4 and Express v5
 * requests
 */
export type RequestLike = Omit<RequestExpress, "param" | "query">

export type MiddlewareWithRequest<T> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<void>

/**
 * Type reflecting properties required by the
 * OpenId Connect Discovery standard.
 *
 * https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
 */
export type OidProviderMetaMinimal = {
  /**
   * REQUIRED. URL using the https scheme with no query or fragment components that the OP asserts as its Issuer Identifier. If Issuer discovery is supported (see Section 2), this value MUST be identical to the issuer value returned by WebFinger. This also MUST be identical to the iss Claim value in ID Tokens issued from this Issuer.
   */
  issuer: string
  /**
   * REQUIRED. URL of the OP's OAuth 2.0 Authorization Endpoint [OpenID.Core]. This URL MUST use the https scheme and MAY contain port, path, and query parameter components.
   */
  authorization_endpoint: string
  /*
   * REQUIRED. URL of the OP's JWK Set [JWK] document, which MUST use the https scheme. This contains the signing key(s) the RP uses to validate signatures from the OP. The JWK Set MAY also contain the Server's encryption key(s), which are used by RPs to encrypt requests to the Server. When both signing and encryption keys are made available, a use (public key use) parameter value is REQUIRED for all keys in the referenced JWK Set to indicate each key's intended usage. Although some algorithms allow the same key to be used for both signatures and encryption, doing so is NOT RECOMMENDED, as it is less secure. The JWK x5c parameter MAY be used to provide X.509 representations of keys provided. When used, the bare key values MUST still be present and MUST match those in the certificate. The JWK Set MUST NOT contain private or symmetric key values.
   */
  jwks_uri: string
  /*
   * REQUIRED. JSON array containing a list of the JWS signing algorithms (alg values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT]. The algorithm RS256 MUST be included. The value none MAY be supported but MUST NOT be used unless the Response Type used returns no ID Token from the Authorization Endpoint (such as when using the Authorization Code Flow).
   */
  id_token_signing_alg_values_supported: string[]
  /*
   * REQUIRED. JSON array containing a list of the OAuth 2.0 response_type values that this OP supports. Dynamic OpenID Providers MUST support the code, id_token, and the id_token token Response Type values.
   */
  response_types_supported: string[]
  /*
   * REQUIRED. JSON array containing a list of the Subject Identifier types that this OP supports. Valid types include pairwise and public.
   */
  subject_types_supported: string[]
}
