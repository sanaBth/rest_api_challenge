const express = require ('express');
var morgan = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//getting all todos
  app.get('/todos', (req, res) => {
    console.log('getting all books');
    Todo.find({})
    .then(result =>res.status(201).json(result) )
    .catch(err => res.status(500).json(err)); 
  });


  //get one todo
  app.get('/todos/:id', (req, res) =>
 // console.log('getting all books');
  Todo.findOne({
    _id: req.params.id
    }) .then(result =>res.status(201).json(result) )
    .catch(err => res.status(500).json(err))
    );


  //post todo
  app.post('/todo', (req, res) => {
    let newTodo = new Todo();
    newTodo.name = req.body.name;
    newTodo.description = req.body.description;
  //console.log(newTodo);
   newTodo.save()
      .then(result =>res.status(201).json(result) )
      .catch(err => res.status(500).json(err)); 
  
  });

  //update todo
  app.put('/todo/:id', (req, res) =>
  Todo.findOneAndUpdate({
    _id: req.params.id
    },
      req.body,{new : true}
    ).then(result => res.json(result))
  .catch(err => res.status(500).json(err))
  
);

/* app.put('/todo/:id', (req, res) =>
  Todo.findByIdAndUpdate(
    req.params.id,req.body,{new : true}
   ).then(result => res.status(201).json(result) )
  .catch(err =>  res.status(500).json(err))
  
); */

//delete todo
  app.delete('/todo/:id', (req, res) => {
    Todo.findOneAndRemove({
      _id: req.params.id
    }).then(result =>res.json({message : "removed with success"}) )
      .catch(err => res.json(err) ); 
  });

app.listen(process.env.port || 4000,function(){
  console.log('now listening for requests');
})
