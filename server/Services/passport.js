import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user.js';
import HandleResponse from '../helpers/HandleResponse.js';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "951053822849-rg92fcg4cfldoma4ptv0vmh496cmba5n.apps.googleusercontent.com",
    clientSecret: "OMLGxPcD8LZbO5JEx7hO2_bC",
    callbackURL: "http://localhost:9000/api1/account/google"
  },
  (token, tokenSecret, profile, done) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        console.log(token);
         //No user was found... so create a new user with values from Google (all the profile. stuff)
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
            googleId: profile.id
          });
          user.save((err) => {
            if (err) console.log(err);
            return done(err, user, token);
          });
        } else {
          //found user
          return done(err, user, token);
        }
      });
  }
));