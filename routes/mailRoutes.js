const express = require('express');
const router =  express.Router();
const dotenv = require('dotenv');
dotenv.config();
var nodemailer = require('nodemailer');

var fs = require('fs');
var path = require('path');
let ejs = require('ejs');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass:process.env.PASSWORD,
  }
});




//send mail format text
router.post('/textmail', (req, res) => {
    var mailOptions = {
        from: 'sanabenthayer30@gmail.com',
        to: 'sanabenthayer30@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'Sending mail format text!',
      
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


  //send mail with html style
  router.post('/htmlmail', (req, res) => {
    var mailOptions = {
        from: 'sanabenthayer30@gmail.com',
        to: 'sanabenthayer30@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
       html:`<h2 style="color:red">Sending mail format html</h2>`
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


//api send mail with variable and template ejs
  router.post('/mailejs', (req, res) => {
 
    var htmlPath = path.join(__dirname, '..', 'template', 'template.html');
      
    var htmlfile = fs.readFileSync(htmlPath, 'utf8');
    let htmlejs = ejs.render(htmlfile, {name: `sana`});
        var mailOptions = {
            from: 'sanabenthayer30@gmail.com',
            to: 'sanabenthayer30@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
           html:htmlejs
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
    
//send mail with attachements
      router.post('/mailfileattach', (req, res) => {
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