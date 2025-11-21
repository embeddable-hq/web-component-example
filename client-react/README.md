# React App Example

Example for how to embed the Embeddable Web Component in a React.js app created using [Create React App](https://create-react-app.dev/).

This example contains two versions. One showing how to embed a single dashboard,
and another showing how to control 3 embeddable in tabs from a single embeddable.

## App Example

This example is active by default. It shows all dashboards available to you as buttons,
and allows you to preview how to embed any of them.

### App Steps

1. run `npm i`
2. in `public/index.html` make sure you are loading the embed from the correct region
3. make sure the token server is running. It can be ran from the **parent folder** using `npm run token-server`
4. run `npm start`

## Multi Tab Example

This example demonstrates how to use one Embeddable to control any amount of other Embeddables,
making use of [variables](https://docs.embeddable.com/deployment/interactivity#pass-in-and-update-variables).

### Multi Tab Steps

1. run `npm i`
2. in `public/index.html` make sure you are loading the embed from the correct region
3. in `src/index.js` replace `<App>` with `<MultiTabApp>`
4. in `src/MultiTabApp.js` replace the IDs in the `embeddables` constant with the IDs of the dashboards you'd like to use
5. make sure the token server is running. It can be ran from the **parent folder** using `npm run token-server`
6. run `npm start`
