import { expressjwt } from "express-jwt"
import type { GetVerificationKey } from "express-jwt"
import type {
  Audience,
  Issuer,
  MiddlewareWithRequest,
  RequestLike
} from "./types.js"

export function buildMsalValidationMiddleware(args: {
  getVerificationKey: GetVerificationKey
  issuer: Issuer
  audience: Audience
}): MiddlewareWithRequest<RequestLike> {
  // This introduces some lack of type safety but it's ok to preserve
  // compatibility with both express v4 and v5.
  //
  // Basically the Request type was narrowed in express v5 by
  // eliminating the param property and narrowing the query parameter,
  // which is basically what we are coercing here with the RequestLike
  // type.
  //
  // Without a cast that would cause a type error because the broader v4
  // types used by expressjwt is in the contravariant position. But
  // that's ok because we know that the expressjwt middleware
  // doesn't use those properties. (I.e., it's typing is, in fact, overly
  // strict.)
  //
  // It does mean it expressjwt has to be pinned to the current version
  // at least for now as nothing in it's typing guarantees it won't
  // use the wider Request type at some point. (Though more likely it
  // will migrate to v5.)
  return expressjwt({
    secret: args.getVerificationKey,
    issuer: [args.issuer],
    audience: [args.audience],
    algorithms: ["RS256"],
    credentialsRequired: true
  }) as MiddlewareWithRequest<unknown>
}
