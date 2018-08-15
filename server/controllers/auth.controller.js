const users = require('../models/users');

let id = 1;

module.exports ={

    login: ( req, res, next ) => {
        
    },

    //This method should look for a username and password on the request body and then create a user object. It should use the global id variable for the id. After pushing the new user object to the users array it should increment the value of id by one so we can keep the value of id unique. It should then set the value of username on the request session's user object to the value of username from the request body. Finally the method should return the updated user object with a status of 200.
    register: ( req, res, next ) => {
        const { session } = req;
        const { username, password } = req.body;

        users.push({ id, username, password });
        id++;

        session.user.username = username;

        res.status(200).send( session.user );
    },

    //This method is responsible for destroying the session and returning the session ( which should be undefined at that point ).
    signout: ( req, res, next ) => {
        const { session } = req;
        session.destroy();
        res.status(200).send( req.session );
    },

    //This method is responsible for reading the user object off of session and return it with a status of 200.
    getUser: ( req, res, next ) => {
        const { session } = req;
        res.status(200).send( session.user );
    },


};