// Copyright 2024 MFB Technologies, Inc.

import {
  PublicClientApplication,
  Configuration,
  InteractiveRequest,
  AccountInfo,
  InteractionRequiredAuthError
} from "@azure/msal-node"
import open from "open"

export function buildAzureTokenGetter(args: {
  tenantId: string
  clientId: string
  apiScope: string
}): { getAuthToken: () => Promise<string> } {
  const MS_AUTHORITY = `https://login.microsoftonline.com/${args.tenantId}`

  const msalConfig: Configuration = {
    auth: {
      clientId: args.clientId,
      authority: MS_AUTHORITY
    }
  }

  const pca = new PublicClientApplication(msalConfig)
  let account: AccountInfo | undefined = undefined

  const getToken = async (): Promise<string> => {
    const interactiveRequest: InteractiveRequest = {
      scopes: [args.apiScope],
      openBrowser: async url => {
        await open(url)
      }
    }

    if (!account) {
      console.log(
        "No account present. Attempting interactive authentication..."
      )
      const result = await pca.acquireTokenInteractive(interactiveRequest)
      if (!result.account) {
        throw new Error("Unexpectedly did not obtain account information")
      }
      // eslint-disable-next-line require-atomic-updates
      account = result.account
      return result.accessToken
    }

    try {
      const result = await pca.acquireTokenSilent({
        account,
        scopes: [args.apiScope]
      })
      return result.accessToken
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        console.log(
          `Received error "${err.errorCode}: ${err.errorMessage}". Attempting interactive authentication...`
        )
        const result = await pca.acquireTokenInteractive(interactiveRequest)
        return result.accessToken
      }
      throw err
    }
  }

  return {
    getAuthToken: getToken
  }
}
