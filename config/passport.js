const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose =  require('mongoose');
const keys =  require('./keys');
const User = require('../models/users');

module.exports =  function (passport) {
   passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSercret,
    callbackURL:'https://sleepy-sea-39799.herokuapp.com/auth/google/callback',
    proxy: true
},
(accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleID: profile.id,
        name: profile.name,
        image: profile.image,
        email: profile.email
    };
    User.findOne({googleID: profile.id}).then(user => {
        if (user) 
        // check for existing user
            done(null, user);
        else {
            new User(newUser).save()
                            .then(user => done(null, user))
                            .cath(err => console.log(err))
        }

    }).catch(err => console.log(err))
}));
}

