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

const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const extName = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedExtensions.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb(new Error("Solo se permiten imágenes en formato JPG, JPEG o PNG"));
    }
};


const uploadMovies = multer({ 
    storage: storageMovies, 
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } 
});


module.exports = uploadMovies;