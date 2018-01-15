const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const appRoot = require('app-root-path');

const UserModel = require(`${appRoot}/server/Models/User`);
const User = require('./User');

const localOptions = {
  usernameField: 'email',
};

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/user/login/google',
};

passport.use(new LocalStrategy(localOptions, localStrategyCallback));
passport.use(new GoogleStrategy(googleOptions, googleStrategyCallback));

const serializeUser = (user, cb) => cb(null, user.id);

const deserializeUser = (id, cb) => UserModel.findById(id)
    .then(user => cb(null, user && user.id ? user : false))
    .catch(cb);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function googleStrategyCallback(accessToken, refreshToken, profile, done) {
  return User.loginWithGoogle({ googleid: profile.id })
    .then(onSuccess)
    .catch(done);

  function onSuccess(user) {
    return user && user.email ? done(null, user) : done(null, false);
  }
}

/**
 * localStrategyCallback - Local Authentication strategy to verify email/password combo.
 *
 * @param  String email    The string email to be verified.
 * @param  String password The string password to be verified.
 * @param  Function done   The callback function, called with error as first argument, user as second.
 * @return Promise         Returns a Promise but calls the done method with the results.
 */
function localStrategyCallback(email, password, done) {
  return User.login({ email, password })
    .then(onSuccess)
    .catch(done);

  function onSuccess(user) {
    return user && user.email ? done(null, user) : done(null, false);
  }
}

/**
 * local - Method to be used as a middleware for a route that logs in with local username/password.
 *
 * @return Function  To be used as middleware in a route that requires local validation.
 */
const local = passport.authenticate('local', { failureRedirect: '/login' });

module.exports = {
  local,
};
