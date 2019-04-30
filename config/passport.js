const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose =  require('mongoose');
const keys =  require('./keys');
const User = require('../models/users');

module.exports =  function (passport) {
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSercret,
    // https://sleepy-sea-39799.herokuapp.com
    callbackURL:'/auth/google/callback',
    proxy: true
},
(accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value
    };
    User.findOne({googleID: profile.id}).then(user => {
        if (user) 
        // check for existing user
          return  done(null, user);
        else {
            new User(newUser).save()
                             .then(user => {return done(null, user);})
        }

    }).catch(err => console.log(err))
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
});
}

