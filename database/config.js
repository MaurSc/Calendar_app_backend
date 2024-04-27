const mongoose = require('mongoose');


const dbConecction = async() => {

      try {

            await mongoose.connect(process.env.DB_CNN);
            
            console.log('DB ONLINE');

      } catch (error) {
            console.log(error)
            throw new Error('Error al inicializar DB')
      }
};


module.exports = {
      dbConecction,
}