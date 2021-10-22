const express = require ('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const User = require ('./models/user')
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//add user with todo

  app.listen(process.env.port || 5000,function(){
    console.log('now listening for requests user');
  })
  