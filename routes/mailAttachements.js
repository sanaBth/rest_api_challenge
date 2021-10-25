const express = require('express');
const router =  express.Router();
const dotenv = require('dotenv');
dotenv.config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass:process.env.PASSWORD,
  }
});



router.post('/textmail', (req, res) => {
    var mailOptions = {
        from: 'sanabenthayer30@gmail.com',
        to: 'sanabenthayer30@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments: [{   // utf-8 string as an attachment
            filename: 'text1.txt',
            content: 'hello world!'
        }]
      };
     
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
         res.status(401).send('error');
        } else {
          console.log('Email sent: ' + info.response);
         res.status(200).send("sent success");
        }
      });
   
  });
module.exports = router;