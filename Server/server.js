
const path = require('path');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(express.json());




const model = require("../Model/model.js")

/////////////////////////////////////////////
// Logger & configuration
function logger(req, res, next) {
    console.log(req.method, req.url);
    next();
}
app.use(logger);
/////////////////////////////////////////////


// app.get("/", (request, response) => {
//     let modelLay = new model()

//     modelLay.name  = "Simon"
//     db.collection("datas").insertOne(modelLay,(err)=>{
//         if (err) throw err;
//         response.send("success")
//     })
// })

app.post('/data/', (request, response) => {
    //let mods = new model()
    const data = request.body;
    let mods = [];
    
    for (let item of data['businesses']) {
        // mods.name = item['name'];
        // mods.price = item['price'];
        // mods.rating = item['rating'];
        // mods.review_count = item['review_count'];
        // mods.url = item['url'];
        // mods.image = item['image_url'];
        // mods.display_phone = item['display_phone'];
        // mods.display_address = item['display_address'];
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
