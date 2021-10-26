const multer = require('multer');
const express = require('express');
const router =  express.Router();
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null,  Date.now()+ '-' +file.originalname );
    }
  });
  var upload = multer({ storage : storage}).single('userPhoto');
   
  router.post('/uploadimage',function(req,res){
      upload(req,res,function(err) {
          if(err) {
              return res.json({ success: false, err })
          }
          
          //res.end("File is uploaded");
          //console.log(req.file.mimetype);
          return res.json({ success: "sent success",image : req.file});
      });
  });
  router.post('/filterimage',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.json({ success: false, err })
        }
       //accepter que  jpg, jpeg, png et gif
        if (req.file.mimetype!== "jpg" || req.file.mimetype!== "jpeg" || 
        req.file.mimetype!== "png" || req.file.mimetype!== "gif" )
         {
          return res.json({message:"Only supports jpg, jpeg, png and gif file format"});
        }
        //res.end("File is uploaded");
        //console.log(req.file.mimetype);
        return res.json({ success: "sent success",image : req.file});
    });
});
var uploadmulti = multer({ storage : storage}).array('userPhoto',2);
router.post('/uploadmultimg',function(req,res){
    uploadmulti(req,res,function(err) {
        if(err) {
            return res.json({ success: false, err })
        }
       //accepter que  jpg, jpeg, png et gif
        
        //res.end("File is uploaded");
        //console.log(req.file.mimetype);
        return res.json({ success: "sent success",image : req.files});
    });
});
module.exports = router;
