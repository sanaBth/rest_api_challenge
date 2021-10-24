const express = require('express');
const router =  express.Router();
const Todo = require('../models/todo');
const User = require('../models/user');


//getting all users
router.get('/users', (req, res) => {
 
  User.find().populate({ path: "todos" } ) 
  .then(result =>res.status(200).json(result) )
  .catch(err => res.status(500).json(err)); 
});

   //get one user
 router.get('/user/:id', (req, res) =>
 // console.log('getting all books');
  User.findOne({
    _id: req.params.id
    }).then(result =>res.status(200).json(result) )
    .catch(err => res.status(500).json(err))
    );


  //update user
  router.put('/user/:id', (req, res) =>
  User.findOneAndUpdate({
    _id: req.params.id
    },
      req.body,{new : true}
    ).then(result => res.json(result))
  .catch(err => res.status(500).json(err))
  
);
  //delete todo
  router.delete('/user/:id', (req, res) => {
    User.findOneAndRemove({
      _id: req.params.id
    }).then(result =>res.json({message : "removed with success"}) )
      .catch(err => res.json(err) ); 
  });
  
  
//add user without todos
router.post('/user/', (req, res) => {
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
router.post('/adduser', async (req, res)=>{
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
 });

 //add user with todos
router.put('/user/:idu/:idt', async (req, res)=>{
  let iduser = req.params.idu;
  let idtodo = req.params.idt;

  User.findByIdAndUpdate(
    iduser,{  $push: { todos: idtodo }}
    ,{new : true}
  ).then(result => res.json(result))
  .catch(err => res.status(500).json(err))
  } );

  //delete todos from user
  router.put('/users/:idu/:idt', async (req, res)=>{
    let iduser = req.params.idu;
    let idtodo = req.params.idt;
  
    User.findByIdAndUpdate(
      iduser,{  $pull: { todos: idtodo}}
      ,{new : true}
    ).then(result => res.json(result))
    .catch(err => res.status(500).json(err))
    } );
  

  //get user with todos
/* TodoSchema.virtual('Listtodos', {
  ref: 'Todo', //The Model to use
  localField: '_id', //Find in Model, where localField 
  foreignField: 'publisher', // is equal to foreignField
});
router.get('/users', async (req, res) => {
  try {
     const data = await User.find()
                                .populate({path: 'Listtodos', select: 'name'});
     res.status(200).json({success: true, data});
  } catch (err) {
     res.status(400).json({success: false, message:err.message});
  }
}) */

//delete todos from user
/* router.delete('/todo/:id', (req, res) => {
  Todo.findOneAndRemove({
    _id: req.params.id
  }).then(result =>res.json({message : "removed with success"}) )
    .catch(err => res.json(err) ); 
}); */
  module.exports = router;