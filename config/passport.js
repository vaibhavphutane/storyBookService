const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose =  require('mongoose');
const keys =  require('./keys');

module.exports =  function (passport) {
   passport.use( new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSercret,
    callbackURL:'http://localhost:3000/auth/google/callback',
    proxy: true
},
(accessToken, refreshToken, profile, done) => {
    console.log(`Access Token ${accessToken}`);
    console.log(`Refresh Token ${refreshToken}`);
    console.log(`Profile Token ${profile}`);
}));
}
