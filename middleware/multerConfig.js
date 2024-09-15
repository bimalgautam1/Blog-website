const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './storage') //null is for error, next arguement for store in storage
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
        
    }
})

module.exports = {multer,storage};