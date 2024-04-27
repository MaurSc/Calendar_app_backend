/*
      rutas de Usuarios /Auth
      host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { createUser, loginUser, revalidateToken } = require('../controllers/authController');
const { validatorJWT } = require('../middlewares/validatorJWT');

const router = Router();

router.post( 
      '/new',
      [ //*MIDDLEWARES
            check( 'name', 'Name is Required' ).not().isEmpty(),
            check( 'email', 'Email is Required' ).isEmail(),
            check( 'password', 'Password is required and to long that 3' ).isLength({ min:3 }),
            fieldValidator
      ] ,
      createUser 
);

router.post( 
      '/',
      [ //*MIDDLEWARES
            check( 'email', 'Email is Required' ).isEmail(),
            check( 'password', 'Password is required and to long that 3' ).isLength({ min:3 }),
            fieldValidator
      ] ,
      loginUser
);

router.get( '/renew', validatorJWT, revalidateToken );


module.exports = router;