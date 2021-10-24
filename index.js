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
const htmltextApi = require('./routes/mailhtmlRoutes');
const templateApi = require('./routes/mailTemplateRoutes');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/apitodo',todoApi);
app.use('/apiuser',userApi);
app.use('/sendmail',mailApi);
app.use('/mailtemplate',templateApi);
app.use('/mailhtml',htmltextApi);
app.listen(process.env.port || 
  4000,function(){
  console.log('now listening for requests');
});
