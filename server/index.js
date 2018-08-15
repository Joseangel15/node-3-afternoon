const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const swag_controller = require('./controllers/swag_controller');
require('dotenv').config();


const checkForSession = require('./middlewares/checkForSession');

const app = express();

app.use( bodyParser.json() ); //Allows the server to read JSON from the request body.

//Allows us to create sessions.
// Remember that session needs a configuration object as the first argument. The object should have a secret, resave, and saveUninitialized property. secret can be any string you like that is stored in your .env file and resave and saveUninitialized should equal true.
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use( checkForSession );

//Endpoints

app.get('/api/swag', swag_controller.read )

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`)});