
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());


/////////////////////////////////////////////
// Logger & configuration
function logger(req, res, next) {
    console.log(req.method, req.url);
    next();
}
app.use(logger);
/////////////////////////////////////////////


app.get("/", (request, response) => {
    db.collection('datas')
        .aggregate([{ $sample: { size: 1 } }])
        .toArray((err, results) => {
            if (err) throw err;
            response.json(results);
            
        });
})

app.post('/data/', (request) => {
    const data = request.body;
    let mods = [];
    for (let item of data['businesses']) {
        mods.push(item);
    }

    db.collection("datas").insertMany(mods, (err) => {
        if (err) throw err;
        console.log("success it works")
    })

});





/////////////////////////////////////////////
// Boilerplate, no need to touch what's below

// For production, handle any requests that don't match the ones above
app.use(express.static(path.join(__dirname, 'client/build')));

// Wild-card, so handle everything else
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


// Set up configuration variables
if (!process.env.MONGODB_URI) {
    console.log('- Error - Must specify the following env variables:');
    console.log("MONGODB_URI='mongodb://someUser:somePassword@something.com:1234/someDatabaseName'");
    console.log('- Consider putting into .env.local');
    process.exit(1);
}

const MONGODB_URL = process.env.MONGODB_URI;
const splitUrl = MONGODB_URL.split('/');
const mongoDbDatabaseName = splitUrl[splitUrl.length - 1];

let db;
// Connect to the MongoDB
MongoClient.connect(MONGODB_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    console.log("--MongoDB connection successful");
    db = client.db(mongoDbDatabaseName);

    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`
      *********************************************
      * Insecure prototyping backend is running!  *
      * Only use for prototyping                  *
      * Backend server up at ${PORT}              *
      *********************************************
    `);
    })
});
