var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('home', { title: 'Kongflix' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Kongflix' });
});
router.get('/pelicula', (req, res) => {
  res.render('pelicula', { title: 'Pelicula' });
});
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});
router.get('/recup', (req, res) => {
  res.render('recup', { title: 'Recuperar' });
});
router.get('/nueva', (req, res) => {
  res.render('nueva', { title: 'Nueva' });
});
router.get('/vip', (req, res) => {
  res.render('vip', { title: 'Vip' });
});
router.get('/productAdd', (req, res) => {
  res.render('productAdd', { title: 'Agregar' });
});
router.get('/productEdit', (req, res) => {
  res.render('productEdit', { title: 'Editar' });
});
router.get('/productDelete', (req, res) => {
  res.render('productDelete', { title: 'Eliminar' });
});
router.get('/admin', (req, res) => {
  res.render('admin', { title: 'Admin' });
});



router.post('/register', (req, res) => {
  console.log(req.body); 

  const { email, password, confirmar_contraseña } = req.body;

  if (!email || !password || !confirmar_contraseña) {
      return res.status(400).send('Todos los campos son obligatorios');
  }

  if (password !== confirmar_contraseña) {
      return res.status(400).send('Las contraseñas no coinciden');
  }

  res.send('Usuario registrado correctamente');
});


router.post('/login', (req, res) => {
  const { email, password, recordar } = req.body;
  
  if (recordar) {
      
      res.cookie('email', email, { maxAge: 30 * 24 * 60 * 60 * 1000 }); 
  }

  
  res.redirect('/home');
});


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

