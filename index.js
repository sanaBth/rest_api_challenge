const express = require ('express');
var morgan = require('morgan');
var cors = require('cors');
const Todo = require('./models/todo');
const User = require ('./models/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoApi = require('./routes/todoRoutes');

const userApi = require('./routes/userRoutes');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/apitodo',todoApi);
app.use('/apiuser',userApi);

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

var mailOptions = {
  from: 'sanabenthayer30@gmail.com',
  to: 'sanabenthayer30@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

app.listen(process.env.port || 
  4000,function(){
  console.log('now listening for requests');
});
