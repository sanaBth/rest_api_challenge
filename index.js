const express = require ('express');
var morgan = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const User = require ('./models/user')
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//getting all todos
  app.get('/todos', (req, res) => {
    console.log('getting all books');
    Todo.find({})
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });


  //get one todo
  app.get('/todos/:id', (req, res) =>
 // console.log('getting all books');
  Todo.findOne({
    _id: req.params.id
    }) .then(result =>res.status(200).json(result) )
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

//add user without todo list
  app.post('/user', (req, res) => {
    let newUser = new User();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.age = req.body.age;

 console.log(newUser);
   newUser.save()
      .then(result =>res.status(201).json(result) )
      .catch(err => res.status(500).json(err)); 
  
  });

//add user with todos
  app.post('/adduser', async (req, res)=>{
    try {
       //validate data as required
       const user = new User(req.body);
       await user.save();
    
       const todo = await Todo.findById({_id: user.todos})
       user.todos.push(todo);
       await todo.save();
       res.status(200).json({success:true, data: user })
    } catch (err) {
       res.status(400).json({success: false, message:err.message})
    }
 })

//delete todos from user






app.listen(process.env.port || 5000,function(){
  console.log('now listening for requests');
})
