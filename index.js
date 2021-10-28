const express = require ('express');
var morgan = require('morgan');
var cors = require('cors');
const Todo = require('./models/todo');
const User = require ('./models/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todoApi = require('./routes/todoRoutes');
const userApi = require('./routes/userRoutes');
const mailApi = require('./routes/mailRoutes');
const uploadApi = require('./routes/upload1imgRoutes');
const apiauth = require('./routes/authRoutes');
//const cronApi = require('./crons/first-crons');
const cookieParser=require('cookie-parser');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* app.use('/apitodo',todoApi);
app.use('/apiuser',userApi); */
//challeneg 4
//app.use('/sendmail',mailApi);
//challeneg 5
//app.use('/apiupload',uploadApi);
//get static image from directory witn config express
//app.use('/uploads', express.static(__dirname + '/uploads'));
//challenge 6
//app.use('/apicron',cronApi);
//challenge 7
app.use('/apiauth',apiauth);

app.listen(process.env.port || 
  4000,function(){
  console.log('now listening for requests');
});
