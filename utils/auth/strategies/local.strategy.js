const {Strategy} = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('./../../../services/auth.service');
const service = new UserService();

// creamos una instancia de la estrategia
const localStrategy = new Strategy( {
    usernameField: 'email' // podemos ajustar los campos al nombre que se requiera.
    ,passwordField: 'password'
},
    async (email, password, done)=> { // agregamos la lógica de negocio
// done es la función que se ejetuta en caso de que la operación salga bien o mal 
    try {
        // cambiamos la logica al servicio correspondiente 
        const user = await service.getUser(email, password);
        // // validaci[o]n de si no existe nigun usuario
        // if (!user){
        //     done(boom.unauthorized(), false);
        // }
        // // validación password 
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch){
        //     done(boom.unauthorized(), false);
        // }

        // // eliminamos el password de los campos que se retornan para que no se muestre en la respuesta 
        // delete user.dataValues.password;  // de esta forma porque al final user me lo devuelve sequalize
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

module.exports = localStrategy;