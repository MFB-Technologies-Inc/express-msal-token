import dotenv from "dotenv"
import { buildAzureTokenGetter } from "./buildAzureTokenGetter.js"

dotenv.config()

const tenantId = process.env.TENANT_ID
const clientId = process.env.CLIENT_ID
const apiScope = process.env.API_SCOPE
if (!(tenantId && clientId && apiScope)) {
  throw new Error("Missing env variables")
}
const getAuthToken = buildAzureTokenGetter({
  tenantId,
  clientId,
  apiScope
}).getAuthToken
