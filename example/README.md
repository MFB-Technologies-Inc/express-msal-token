# Example app

This example provides a client and server that demonstrates basic usage of this middleware.

## Setup Entra Id

Setup of the app requires registering two applications in Entra ID:

1. Server Application - The server application should be registered without a redirect and with an api exposed. You will need both the client id of this registration and the api scope uri, which you will put in the appropriate env variables.

NB: By default Azure creates an application that issues and accepts v1 tokens. If you want to use v2 tokens you have to manually edit the manifest to set `accessTokenAcceptedVersion` to `2`

2. Client Application - The client application should be registered and it should be setup for the "Mobile and desktop applications" platform with a redirect to http://localhost. You'll need the client id for this application as well.

## Setup Environment

- Add the tenant id, the client ids, and the scope from the above setup to a `.env` file. The format of the file is demonstrated in the `env` file (without the dot) in the `example` directory. You can copy it over to `.env` and then add the values.

## Run App

It's best to do this in two console windows/tmux panes. In each one `cd` in to `example`

In the first, launch the server with `npx vite-node server.ts`. You should see output on the console confirming the server is running on port 3000.

In the second, run the client app with `npx vite-node client.ts`. You should be prompted to login on your browser. Use an account in the tenant in which the apps are registered above. Once you login, you should see output on the console showing a `401` login followed by a `201` login.
