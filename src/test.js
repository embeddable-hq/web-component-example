const http = require("http");


const API_KEY = '48224ce1-4e49-46d9-875b-57965e00bcab';
const EMBEDDABLE_ID = '5f311740-d844-412e-aab8-4d9e632aba2f';
const PORT = 8080;
const SECURITY_CONTEXT = { 
    /* any context you want to provide to the SQL data models */
    orgId: 'org12',
    userId: '9sZSJ9LHsiYXR0cmlidX'
};
const USER_KEY = 'some-user@domain.com';


async function handler(req, res) {
    console.log('Fetching token...')

    const response = await fetch(`https://api.embeddable.com/api/v1/security-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_KEY}` /* keep your API Key secure */
        },
        body: JSON.stringify({
            embeddableId: EMBEDDABLE_ID, /* the dashboard to load */
            expiryInSeconds: 60*60*24*7, /* token expiry */
            securityContext: SECURITY_CONTEXT, /* any context you want to provide to the SQL data models */
            user: USER_KEY // unique key representing current user
        })
    });
    console.log(`Response: ${response.status} ${response.statusText}`);

    const json = await response.json();
    if(!json.success) {
        res.writeHead(response.status, { "Content-Type": "text/html" });
        res.end(`<!doctype html>
          <html>
            <head>
              <title>Error</title>
              <meta charset="utf-8" />
            </head>
            <body>
              <h2>${response.statusText}</h2>
              <div>${json.errorMessage}</div>
            </body>
          </html>`);
        return;
    }

    console.log('Rendering Embeddable dashboard.')
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!doctype html>
      <html>
        <head>
          <title>Embedabble</title>
          <meta charset="utf-8" />
          <script
            type="module"
            src="https://api.embeddable.com/js/v1/embeddable.js"
          ></script>
        </head>
        <body>
          <em-beddable
            token="${json.token}"
          ></em-beddable>
        </body>
      </html>`);
}

http.createServer(handler).listen(PORT);
console.log(`Server listening on port ${PORT}`)

