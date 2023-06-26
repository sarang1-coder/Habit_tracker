const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password !== password) {
          console.log('Invalid username/password');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log('Error in finding user --> passport');
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log('Error in finding user --> passport');
    return done(err);
  }
});

passport.checkAuthentication = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/users/signup');
  } catch (err) {
    console.log('Error in checking authentication --> passport');
    return next(err);
  }
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};


module.exports = passport;
