import { getAzureOpenIdInfo } from "../getAzureOpenIdInfo.js"

const v1ExpectedJwks = "https://login.microsoftonline.com/common/discovery/keys"
const v2ExpectedJwks =
  "https://login.microsoftonline.com/f6e8a180-5896-487e-a999-fa5f97d56ac6/discovery/v2.0/keys"
const v1ExpectedIssuer =
  "https://sts.windows.net/f6e8a180-5896-487e-a999-fa5f97d56ac6/"
const v2ExpectedIssuer =
  "https://login.microsoftonline.com/f6e8a180-5896-487e-a999-fa5f97d56ac6/v2.0"

it("returns v1 values for domain", async () => {
  const result = await getAzureOpenIdInfo({
    tenantIdOrDomain: "mfbtech.com",
    tokenVersion: 1
  })

  expect(result.jwksUri).toEqual(v1ExpectedJwks)
  expect(result.issuer).toEqual(v1ExpectedIssuer)
})

it("returns v1 values for tenantId", async () => {
  const result = await getAzureOpenIdInfo({
    tenantIdOrDomain: "f6e8a180-5896-487e-a999-fa5f97d56ac6",
    tokenVersion: 1
  })

  expect(result.jwksUri).toEqual(v1ExpectedJwks)
  expect(result.issuer).toEqual(v1ExpectedIssuer)
})

it("returns v2 values for domain", async () => {
  const result = await getAzureOpenIdInfo({
    tenantIdOrDomain: "mfbtech.com",
    tokenVersion: 2
  })

  expect(result.jwksUri).toEqual(v2ExpectedJwks)
  expect(result.issuer).toEqual(v2ExpectedIssuer)
})

it("returns v2 values for tenantId", async () => {
  const result = await getAzureOpenIdInfo({
    tenantIdOrDomain: "f6e8a180-5896-487e-a999-fa5f97d56ac6",
    tokenVersion: 2
  })

  expect(result.jwksUri).toEqual(v2ExpectedJwks)
  expect(result.issuer).toEqual(v2ExpectedIssuer)
})
