const multer = require("multer");
const path = require("path");

const storageMovies = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/movies"); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const uploadMovie = multer({ storage: storageMovies });

module.exports = uploadMovie;