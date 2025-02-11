# express-msal-token

Express middleware to validate MSAL tokens

## Background

https://learn.microsoft.com/en-us/entra/identity-platform/access-tokens

https://github.com/AzureAD/microsoft-identity-web/discussions/2405

https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/6113

## Types

We use express types from 4.17.20 to ensure compatibility with the types included by jwks-rsa -- which have not been upgraded to 5.0.0
