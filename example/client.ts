import dotenv from "dotenv"
import { decodeJwt } from "jose"
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

const token = await getAuthToken()

const badResponse = await fetch("http://localhost:3000/authorized")

console.log(badResponse.status)

const authResponse = await fetch("http://localhost:3000/authorized", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`
  }
})

console.log(authResponse.status)
const responseText = await authResponse.text()
console.log(responseText)
