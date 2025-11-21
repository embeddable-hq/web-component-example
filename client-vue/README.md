# Vue Example

Example for how to embed the Embeddable Web Component in a Vue.js app.

## Steps

1. run `npm i`
2. in the entry point `index.html` make sure you are loading the embed from the correct region
3. in `src/App.vue` set the `embedID` constant to the ID of the Embeddable you would like to display
4. make sure the token server is running. It can be ran from the **parent folder** using `npm run token-server`
5. run `npm run dev`
