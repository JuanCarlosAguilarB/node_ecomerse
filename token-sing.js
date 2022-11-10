const jwt = require('jsonwebtoken');

// con esta variable se realiza la firma del jwt, tener en cuenta que esta debe ser privada
// le front tampoco deberia enterarse, solo al back debe conocerla 
const secret = 'myCat';

// esto ser'a lo que vamos a encriptar 
const payload = {
    sub: 1, // es la forma en la que vamos a identificar al usuario. hace parte dedl estandar 
            // el sub es como el identificador del token
    role: 'costumer' // podemos agregar los valores que queramos, 
                // pero lo minimo es el sub
}
const signToken = (payload, secret)=>{
    return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token); 
