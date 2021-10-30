
const passport = require('passport');
const BearerStrategy = require ('passport-http-bearer');
const jwt = require("jsonwebtoken");
const Utilisateur = require('../models/utilisateur');


passport.use(new BearerStrategy(
    async function(token, done) {
    const decode = await jwt.verify(token,process.env.TOKEN_KEY);
    console.log(decode);
    Utilisateur.findOne({ _id: decode.id }, 
      function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
  ));



  module.exports = passport;