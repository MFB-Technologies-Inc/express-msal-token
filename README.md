# express-msal-token

Express middleware to validate signature, issuer, and audience of MSAL tokens

WARNING: This app is something of a WIP. It relies on `expressjwt` and `jwks-rsa` for the underlying validation. Those are well tested, popular libraries, so it should be fine from that perspective. However, there is a fair bit of nuance to how MSAL generates tokens and I'm not sure this captures all the various use cases (e.g., multitenant, B2C, etc). Feel free to raise issues with suggestions for improvement.

## Background

https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens

https://github.com/AzureAD/microsoft-identity-web/discussions/2405

https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/6113

## Quickstart

```typescript
const expressMsalToken = await buildExpressMsalToken({
  tenantIdOrDomain: "contoso.com",
  audience: audienceUtils.v2Audience({ apiClientId: "0000-ABCDE-12345-0000" }),
  tokenVersion: 2
})

app.get("/authorized", expressMsalToken, (req: WithMsalAuth<Request>, res) => {
  res.status(200).send(`Welcome ${req.auth?.name ?? "unknown"}`)
})
```

## Usage

### buildExpressMsalToken

This function builds the middleware to decrypt an msal token and validate the issuer and audience. It takes the following parameters:

`tenantIdOrDomain`: Either the tenant id of an Azure tenant or the domain of the tenant.

`audience`: The audience value to validate against the `aud` claim in the token. See this Microsoft documentation for more info on what that should be. https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference#payload-claims Use the `audienceUtils` tools to generate this as it is a nominally typed value.

`tokenVersion` Either 1 or 2. These are the two version of tokens MSAL will issue. Note that if you setup a registration via the Azure GUI it currently will default to v1.

### audienceUtils

A collection of utilities to generate the audience value. The audience value is different depending on whether you are using a v1 or v2 token, as explained (here)[https://learn.microsoft.com/en-us/entra/identity-platform/access-token-claims-reference#payload-claims].

In v1 access tokens the `aud` claim is set by default to a URL in
the format api://[client id of the app registration] -- which is
what this function generates. But it can actually be set to
any URI so there is no way to set it deterministically short of
just checking the API scope settings in the app registration

`audienceUtils.v1DefaultAudience` will generate the audience from the apiClientId which is _usually_ what you want for v1 tokens, but not guaranteed.

`audienceUtils.v1Audience` lets you generate an arbitrary audience if you aren't using the default

`audienceUtils.v2Audience` generates the audience from the apiClientId (they are actually the same values--it just gives it a nominal type)

In v2 access tokens the `aud` claim is always the client id of the
application registration for the api app.

## Types

Inside this package we use express types from 4.17.20 to ensure compatibility with the types included by jwks-rsa -- which have not been upgraded to 5.0.0.

The middleware should still work with both versions of express -- v4 and v5 -- since the type differences are irrelevant to this middleware.

In order to get correct typing on your `req` object after the middleware runs we export a utility type called `WithMsalAuth<T>`. Call it with the Request type from the version of express you are running and it will add the `auth` property to that type with the various claims added by MSAL.

For example:

```typescript
import type { Request } from "express"

// setup app, middelware etc

app.get("/", msalTokenMiddleware, (req: WithMsalAuth<Request>, res) => {
  //endpoint logic
})
```

Note, we don't type every possible claim value as these can differ based on variety of things, including v1 vs v2 tokens, optional claims set, MS Graph permissions etc. Commonly used ones are included.
