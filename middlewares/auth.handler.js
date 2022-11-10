const boom = require('@hapi/boom');
// en este caso, vamos a traer wel apikey desde las variables de entorno
// recordemos, estamos trabajando con clean architecture, por lo que tenemos que leer las variables de entorno de:
const {config} = require('./../config/config')

    function checkApiKey(error,request, response, next ){
        const apiKey = request.header['api']; // the parameters come in the header.
        if (apiKey==''){
            next(); // next sin argumentos  indicar que se continue a la siguiente ejecucion
        }
        else{
            next(boom.unauthorized()); // se envia un mensaje de error
        }
} 

    function checkAdmin(error,request, response, next ){
        const user = req.user;
        if (user.role === role){
            next();
        }else{
            next(boom.unauthorized()); // se envia un mensaje de error
        }
    }

    
    function checkRole(...roles){
        return (request, response, next)=>{
        const user = req.user;
        if (roles.includes(user.role)){
            next();
        }else{
            next(boom.unauthorized()); // se envia un mensaje de error
        }
    }
    }

module.exports = {checkApiKey, checkRole}