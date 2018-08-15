const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();


//Middleware
const checkForSession = require('./middlewares/checkForSession');

//Controllers
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth.controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

const app = express();

app.use( bodyParser.json() ); //Allows the server to read JSON from the request body.

//Allows us to create sessions.
// Remember that session needs a configuration object as the first argument. The object should have a secret, resave, and saveUninitialized property. secret can be any string you like that is stored in your .env file and resave and saveUninitialized should equal true.
app.use( session({
    secret: 'supermegasecret',
    resave: false,
    saveUninitialized: true
}));
app.use( checkForSession );
app.use( express.static( `${__dirname}/build`));

//Endpoints

app.get('/api/swag', swag_controller.read )

app.post('/api/login', auth_controller.login)

app.post('/api/register', auth_controller.register)

app.post('/api/signout', auth_controller.signout)

app.get('/api/user', auth_controller.getUser)

app.post('/api/cart', cart_controller.add)

app.post('/api/cart/checkout', cart_controller.checkout)

app.delete('/api/cart', cart_controller.delete)

app.get('/api/search', search_controller.search)

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`)});