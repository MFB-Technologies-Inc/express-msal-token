import type { NextFunction, Request, Response } from "express"
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

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message)
  res.status(500).send("Something went wrong!")
})

app.listen(3000, () => {
  console.log(`Server running on port 3000`)
})
