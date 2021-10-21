const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    description:{
        type:String,
        required:[true,'Name field is required']
    }
  
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports=Todo;