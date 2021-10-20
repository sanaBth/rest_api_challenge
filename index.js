const express = require ('express');
var morgan = require('morgan');
var cors = require('cors');


const app = express();

app.use(cors()) 
app.get('/api', function (req, res, next) {
    res.json({msg: 'Hello world!'}) ; console.log('GET request');
  })
/* app.get('/',function(req,res){
    console.log('GET request');
    res.end({name:'sana'});
})
 */
app.listen(process.env.port || 4000,function(){
    console.log('now listening for requests');
})