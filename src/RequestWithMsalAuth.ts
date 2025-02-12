import type { Request as RequestJWT } from "express-jwt"
import { RequestLike } from "./types.js"

/**
 * Type of the `auth` parameter that will be added to
 * the Request object on a successful MSAL auth validation
 *
 * NB: More claims are actually added and which ones depends on,
 * among other things:
 *  - whether the access token version is 1.0 or 2.0
 *  - whether optional claims have been specified
 *  - the kind of account used to login (e.g., guest vs normal user)
 *  - whether the resource server has certain permissions to get info
 *    about the user from MS Graph
 *
 * We are listing ones that are most likely to be used for authorization decisions
 *
 * For more info see https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference
 * and https://learn.microsoft.com/en-us/entra/identity-platform/optional-claims-reference
 */
export type MsalAuth = RequestJWT["auth"] & {
  /** Display name */
  name?: string
  /** Unique id of the user */
  oid?: string
  /** Allowed scope on the resource/API */
  scp?: string
  /** Application roles assigned to user */
  roles?: string[]
  /** Unique id for the user in the context of the application (not globally) */
  sub?: string
  /** Tenant id */
  tid?: string
  /** Version of the access token */
  ver?: string
}

/**
 * Utility type to add the MSAL auth property to an express Request object
 */
export type WithMsalAuth<TRequest extends RequestLike> = TRequest & {
  auth?: MsalAuth
}
