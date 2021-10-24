const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'firstName field is required']
    },
    lastName:{
        type:String,
        required:[true,'lastName field is required']
    },
    email:{
        type:String,
        required:[true,'email field is required']
    },
     password:{
        type:String,
        required:[true,'password field is required']
    }, age:{
        type:Number,
        required:[true,'age field is required']
    },todos:[{
        type: Schema.Types.ObjectId,
        ref: 'todo'
     }]
 
});

const User = mongoose.model('user', UserSchema);

module.exports=User;