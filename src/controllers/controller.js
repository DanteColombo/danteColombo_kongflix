const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const products = require('../data/products.json')
const categories = require('../data/opciones/categories.json')
const idioma = require('../data/opciones/idioma.json');
const formatos = require ('../data/opciones/formatos.json');
const calidades = require ('../data/opciones/calidades.json')
const resoluciones = require('../data/opciones/resoluciones.json')
const generos = require('../data/opciones/generos.json')
const { isUtf8 } = require('buffer');
const { readJson, saveJson } = require('../data');
const { emit } = require('process');



module.exports = {

    index: (req, res) =>{
      console.log(req.session.userLogin);
      
      const products = readJson('/products.json')
      return res.render('home',{
        products
      });
    },

    admin : (req, res) => {
      
      return res.render('admin',{
        products
      })
    },


    list: (req, res) => {
        const products = readJson('/products.json')
        return res.render('lista', );
      },

    detail: (req, res) => {

        const products = readJson('/products.json')
        const product = products.find(product => product.id === +req.params.id)
        
        return res.render('pelicula',{
          ...product,
        } );
      },
    
    add: (req, res) => {
        const products = readJson('/products.json')
        return res.render('productAdd',{
          categories,
          idioma,
          formatos,
          calidades,
          resoluciones,
          generos
        }
         );

      },

    create: (req, res) => {
        console.log("Archivo subido:", req.file);
        console.log("Datos del formulario:", req.body);
        if (!req.file) {
          return res.status(400).send("No se subió ningún archivo");
      }
        const products = readJson('/products.json')
      
        const {id, category, titulo, genero, anio, peso, calidad, resolucion,  idiomaAud, idiomaSub, formato, link, descripcion} = req.body;

        const fotoPelicula = req.file.filename;

        const newProduct = {
            id: products[products.length - 1].id + 1,
            category,
            titulo : titulo.trim(),
            genero,
            anio: +anio,
            peso : +peso,
            calidad,
            resolucion,
            idiomaAud ,
            idiomaSub,
            formato,
            link: link.trim(),
            fotoPelicula,
            descripcion: descripcion.trim()
            
        }

        products.push(newProduct)
        saveJson('products.json',products)
    
        return res.redirect('/pelicula/' + newProduct.id)
      },

    edit: (req, res) => {
      
      const {id}= req.params
      const products = readJson('/products.json')
      const categories= readJson('/opciones/categories.json')

      const product = products.find(product => product.id === +id)

      return res.render('productEdit',{
        categories,
        ...product
      }

      );
    },

    update: (req,res) => {

      const products = readJson('products.json')

      const {category, titulo, anio} = req.body

      const productsModify = products.map(product => {
        if(product.id === +req.params.id){
            product.category = category;
            product.titulo = titulo.trim();
            product.anio = +anio;
        }
        return product
    })

    saveJson('products.json',productsModify)

      return res.redirect('/admin')
    },

    remove: (req, res) => {

      const {id}= req.params
      const products = readJson('/products.json')

      const productsModify = products.filter(product => product.id !== +id)
      saveJson('products.json',productsModify)

      return res.redirect('/admin')
    },
    
    register:  (req, res) => {
      return res.render('register',)
    },

    registerProcess: (req, res) => {
  
      const users = readJson('users.json');
  
      const { email, password, confirmar_contrasena } = req.body;
  
      if (!email || !password || !confirmar_contrasena) {
          return res.status(400).send('Todos los campos son obligatorios');
      }
  
      if (password !== confirmar_contrasena) {
          return res.status(400).send('Las contraseñas no coinciden');
      }
  
      const profileImage = req.file ? req.file.filename : "default.jpg";
  
      const newUser = {
          id: uuidv4(),
          email: email.trim(),
          password: bcrypt.hashSync(password, 10),
          rol: 'user',
          profileImage
      };
  
      users.push(newUser);
      saveJson('users.json', users);
  
      return res.redirect('login');
  },

    login: (req, res) =>{
      return res.render("login")
    },

    loginProcess: (req, res) => {

      const users = readJson('users.json')

      const {email, password} = req.body

      const user = users.find(user=> user.email == email && bcrypt.compareSync(password, user.password))

      if(!user){
        return res.render('login',{
          error: "credenciales invalidas"
        })
      }

      req.session.userLogin = {
        id : user.id,
        email : user.email,
        rol : user.rol
      }

      return res.redirect('home')
    }
  }

  