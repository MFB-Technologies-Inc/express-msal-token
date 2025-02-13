import { Audience } from "./types.js"

export const audienceUtils = {
  /**
   * In v1 access tokens the `aud` claim is set by default to a URL in
   * the format api://[client id of the app registration] -- which is
   * what this function generates. But it can actually be set to
   * any URI so there is no way to set it deterministically short of
   * just checking the API scope settings in the app registration
   */
  v1DefaultAudience: ({ apiClientId }: { apiClientId: string }): Audience =>
    `api://${apiClientId}` as unknown as Audience,
  /**
   * Since there is no deterministic way to set a v1 token audience, this
   * function just converts a string to the proper nominal type.
   */
  v1Audience: ({ audience }: { audience: string }): Audience =>
    audience as unknown as Audience,
  /**
   * In v2 access tokens the `aud` claim is always the client id of the
   * application registration for the api app.
   */
  v2Audience: ({ apiClientId }: { apiClientId: string }): Audience =>
    apiClientId as unknown as Audience
}
