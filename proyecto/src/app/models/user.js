const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  local: {
    nombre: String,
    apellido: String,
    dni: String,
    email: String,
    password: String,
    media: Number
  },
});

userSchema.methods.validPassword = function( password ) {
    return ( this.local.password === password );
};

// Crea el modelo de usuario y lo exporta a la app
module.exports = mongoose.model('User', userSchema);
