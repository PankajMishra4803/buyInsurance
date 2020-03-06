//Create Express App
const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
const route = require('./router');
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use('/api', route);
app.listen(port, (err) => {
    if (err) {
        console.log('We are some error', err);
    }
    console.log('Server running on port number:', port);
});
app.use((req, res) => {
    res.status(404);
    res.json({ "message": "API not found" });
});
