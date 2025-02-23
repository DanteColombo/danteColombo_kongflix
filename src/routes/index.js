var express = require('express');
var router = express.Router();
const multer = require("multer");
const onlyAdmins = require('../middlewares/onlyAdmins.js');
const upload = require("../middlewares/usersImages");
const usersController = require("../controllers/controller"); 
var {index,admin,  list ,detail , add ,edit, create, update, remove, register, registerProcess, login, loginProcess} = require('../controllers/controller');


router.get('/', index);


router.get('/home', index);

router.get('/lista', list)

router.get('/pelicula/:id', detail)

router.get('/productAdd', add)


router.post('/productAdd', create)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
  },
});


router.get('/productEdit/:id', edit)

router.put('/update/:id', update)

router.delete('/remove/:id', remove);



router.get('/recup', (req, res) => {
  res.render('recup',);
});
router.get('/nueva', (req, res) => {
  res.render('nueva', );
});
router.get('/vip', (req, res) => {
  res.render('vip',);
});


router.get('/admin',onlyAdmins, admin);

router.get('/register', register);

router.post('/registerProcess',upload.single("profileImage"), registerProcess);


router.get('/login', login);

router.post('/loginProcess', loginProcess);


router.post('/recup', async (req, res) => {
  const { email } = req.body;

  
  if (email !== 'micorreo@gmail.com') {
      return res.status(400).send('Correo no registrado');
  }

  res.send('Se ha enviado un enlace de recuperación a tu correo');
});

router.post('/nueva_contraseña', (req, res) => {
  const { nueva_contraseña, confirmar_contraseña } = req.body;

  if (nueva_contraseña !== confirmar_contraseña) {
      return res.status(400).send('Las contraseñas no coinciden');
  }

  res.send('Tu contraseña ha sido restablecida con éxito');
});

module.exports = router;

