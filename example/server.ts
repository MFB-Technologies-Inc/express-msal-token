import type { Request } from "express"
import type { WithMsalAuth } from "../src/index.js"
import express from "express"
import { buildExpressMsalToken, audienceUtils } from "../src/index.js"

const tenantId = process.env.TENANT_ID
const apiId = process.env.API_CLIENT_ID

if (!tenantId || !apiId) {
  throw new Error("Missing env variables")
}

const app = express()
const expressMsalToken = await buildExpressMsalToken({
  tenantIdOrDomain: tenantId,
  audience: audienceUtils.v2Audience({ apiClientId: apiId }),
  tokenVersion: 2
})

app.get("/authorized", expressMsalToken, (req: WithMsalAuth<Request>, res) => {
  res.status(200).send(`Welcome ${req.auth?.name ?? "unknown"}`)
})

app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})
