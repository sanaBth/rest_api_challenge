const express = require('express');
const router =  express.Router();
const cron = require('node-cron');



 cron.schedule('*/2 * * * *', function() {
    console.log('Rrunning a task every two minute');
  }); 


module.exports = router;