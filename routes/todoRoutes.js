const express = require('express');
const router =  express.Router();
const Todo = require('../models/todo');


//getting all todos
router.get('/todos/', (req, res) => {
    console.log('getting all books');
    Todo.find({})
    .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err)); 
  });


  //get one todo
  router.get('todos/:id', (req, res) =>
 // console.log('getting all books');
  Todo.findOne({
    _id: req.params.id
    }) .then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err))
    );


  //post todo
  router.post('todo', (req, res) => {
    let newTodo = new Todo();
    newTodo.name = req.body.name;
    newTodo.description = req.body.description;
  //console.log(newTodo);
   newTodo.save()
      .then(result =>res.status(201).json(result) )
      .catch(err => res.status(500).json(err)); 
  
  });

  //update todo
  router.put('todo/:id', (req, res) =>
  Todo.findOneAndUpdate({
    _id: req.params.id
    },
      req.body,{new : true}
    ).then(result => res.json(result))
  .catch(err => res.status(500).json(err))
  
);

/* router.put('/todo/:id', (req, res) =>
  Todo.findByIdAndUpdate(
    req.params.id,req.body,{new : true}
   ).then(result => res.status(201).json(result) )
  .catch(err =>  res.status(500).json(err))
  
); */

//delete todo
  router.delete('todo/:id', (req, res) => {
    Todo.findOneAndRemove({
      _id: req.params.id
    }).then(result =>res.json({message : "removed with success"}) )
      .catch(err => res.json(err) ); 
  });


module.exports = router;