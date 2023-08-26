var path = require('path');
const multer = require('multer')
const { v4: uuidv4 } = require("uuid");

/* 
  Upload Images of Admin Profile
*/

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var x = (file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var x = (file);
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + uuidv4() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype =="application/pdf" || file.mimetype == 'application/octet-stream') {
            callback(null, true)
        }
        else {
            console.log("Only jpeg and png extension allowed !")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = upload;