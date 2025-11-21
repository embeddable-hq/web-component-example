# em-beddable Web Component Example

A simple example of how to Embed the Embeddable.com Web Component in your website.
There are currently 5 examples in this repository:

- [HTTP server with html response](http-server/README.md)
- [simple React.js example](static-react/README.md)
- [React.js using "Create React App"](client-react/README.md)
- [Angular](client-angular/README.md)
- [Vue](client-vue/README.md)

Also includes a simple node server that uses the [tokens API](https://docs.embeddable.com/deployment/tokens-api).

## Prerequisites

Most examples require [Node.js](https://nodejs.org) version 20 or newer to be installed.

## Steps

1. clone or download this repository
2. choose an example, and follow the README file contained in it

## Token Server

Two examples, `client-react` and `client-vue`, require the
token server included in this repository to be running.

### Token Server Steps

1. click "Publish" on your Embeddable dashboard to get your `API_KEY`
2. update `token-server/.env` to use your `API_KEY`, and optionally set the `USER_KEY`
3. set the `BASE_URL`, and optionally the `SECURITY_CONTEXT` in `token-server/index.js`
4. run `npm i` to install dependencies
5. run `npm run token-server`
6. follow the instructions in the `client-*` folder to run a client
