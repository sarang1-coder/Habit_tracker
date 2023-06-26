var client_id=process.env.CLIENT_ID;
var client_secret=process.env.CLIENT_SECRET;


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/users');

passport.use(new GoogleStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: "http://localhost:501/users/auth/google/callback",
  },

  async function(accessToken, refreshToken, profile, done) {

    try {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      }

      user = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex')
      });

      return done(null, user);
    } catch (err) {
      console.log('err in google strategy', err);
      return done(err);
    }
  }
));

module.exports = passport;
