const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/UserModel');


const createUser = async (req, resp = response) => {
      const{ email, password } = req.body;
      
      try {
            let user = await User.findOne({ email });

            if( user ){
                  return resp.status(400).json({
                        ok:false,
                        msg:'Usuario existente con ese Email'
                  });
            }
            user = new User( req.body );
            
            //*tokenize password
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( password, salt );

            await user.save();
            
            //*generar JWT
            const token = await generateJWT( user.id, user.name )

            return resp.status(201).json({ 
                  ok:true,
                  uid:user.id,
                  name:user.name,
                  token
            });

      } catch (error) {
            console.log(error);
            return resp.status(500).json({ 
                  ok:true,
                  msg:'Por favor hable con el administrador',
            });
      }
};

const loginUser =  async(req, resp = response) => {
      const{ email, password } = req.body;

      try {
            const user = await User.findOne({ email });

            if( !user ){
                  return resp.status(400).json({
                        ok:false,
                        msg:'Usuario o contraseña invalidos'
                  });
            }

            //*DEtokenize password
            const validPass = bcrypt.compareSync( password, user.password );

            if( !validPass ){
                  return resp.status( 400 ).json({
                        ok:false,
                        msg:'Password incorrecto'
                  });
            }

            //*generar JWT
            const token = await generateJWT( user.id, user.name )

            return resp.status(200).json({ 
                  ok:true,
                  uid:user.id,
                  name:user.name,
                  token
            });

      } catch (error) {
            console.log(error);
            return resp.status(500).json({ 
                  ok:true,
                  msg:'Por favor hable con el administrador',
            });
      }


      return resp.status(200).json({
            ok:true,
            msg:'login',
            email,
            password,
      });
}

const revalidateToken =  async(req, resp = response) => {

      const { uid, name } = req;

      //*generacion nuevo JWT 
      const token = await generateJWT( uid, name )


      return resp.status(200).json({
            ok:true,
            token
      });
}

module.exports = {
      createUser,
      loginUser,
      revalidateToken,
}