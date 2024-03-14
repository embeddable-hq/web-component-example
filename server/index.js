const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
const API_KEY = '48224ce1-4e49-46d9-875b-57965e00bcab';
const SECURITY_CONTEXT = { 
    /* any context you want to provide to the SQL data models */
    orgId: 'org12',
    userId: '9sZSJ9LHsiYXR0cmlidX'
};
const USER_KEY = 'some-user@domain.com';


const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/embeddables', async (req, res) => {
    const response = await fetch(`https://api.embeddable.com/api/v1/embeddables`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_KEY}` /* keep your API Key secure */
        }
    });
    console.log(`Embeddables Response: ${response.status} ${response.statusText}`);
    const json = await response.json();
    const embeddables = json.embeddables.filter(e => e.lastPublishedAt.default)
    res.json({ embeddables });
})

app.get('/token', async (req, res) => {
	console.log(req)
	const response = await fetch(`https://api.embeddable.com/api/v1/security-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_KEY}` /* keep your API Key secure */
        },
        body: JSON.stringify({
            embeddableId: req.query.embeddableId, /* the dashboard to load */
            expiryInSeconds: 60*60*24*7, /* token expiry */
            securityContext: SECURITY_CONTEXT, /* any context you want to provide to the SQL data models */
            user: USER_KEY // unique key representing current user
        })
    });
    console.log(`Token Response: ${response.status} ${response.statusText}`);

    const json = await response.json();
    res.json(json)
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
      console.log('server listening on port '+PORT)
});