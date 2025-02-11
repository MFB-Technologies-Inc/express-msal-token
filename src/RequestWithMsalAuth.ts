import type { Request as RequestJWT } from "express-jwt"
import { Request as RequestExpress } from "express"

/**
 * Type of the `auth` parameter that will be added to
 * the Request object on a succesful msal auth validation
 */
export type MsalAuth = RequestJWT["auth"] & {
  name?: string
  unique_name?: string
  upn?: string
  oid?: string
  scp?: string
  roles?: string[]
}

/**
 * Request-like type that is satisfied by both Express v4 and Express v5
 * requests
 */
type RequestLike = Omit<RequestExpress, "param" | "query">

/**
 * Utility type to add the MSAL auth property to an express Request object
 */
export type WithMsalAuth<TRequest extends RequestLike> = TRequest & {
  auth?: MsalAuth
}
