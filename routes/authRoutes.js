const express = require('express');
const router =  express.Router();
const bcrypt = require ('bcrypt')
const jwt = require("jsonwebtoken");
const passport = require("./../passport-strategies/bearer")
const Utilisateur = require('../models/utilisateur');
require("dotenv").config();

// register user with hashed passwored
router.post ("/createUser", async (req,res) => {
    let newUser = new Utilisateur();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password =  await bcrypt.hash(req.body.password, 10)
    Utilisateur.findOne({email:req.body.email}, function(err, user){
        if(!user) {
            newUser.save()
            .then(result =>res.status(201).json(result) )
            .catch(err => res.status(500).json(err)); 
        }
        else {
            res.status(500).json("email existe deja");
          }
    });


})

//login
 router.post("/login", async (req,res) => {
    const user = await Utilisateur.findOne({ email: req.body.email });
    if (!user) 
    {
      return res.status(404).json({
       
        message: "Email not found",
      });
    } 
   else
   {
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) 
            {
               const token =jwt.sign({
                   id:user._id,
                   email:user.email
               },
               process.env.TOKEN_KEY,{
                   expiresIn:86400
               });
              
                return res.json({success: true,user, token});
            } else 
            {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
   })
}
      }) ;


//login with passport security
  router.get('/profile', 
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });
module.exports = router;