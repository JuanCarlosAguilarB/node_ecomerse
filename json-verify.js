const jwt = require('jsonwebtoken');

// con esta variable se realiza la firma del jwt, tener en cuenta que esta debe ser privada
// le front tampoco deberia enterarse, solo al back debe conocerla 
const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjb3N0dW1lciIsImlhdCI6MTY2NzA3OTMzM30.PwNZ2zl8R4xMk0weUuOyKFHTzPHlH9qhT48o0r2XvPI';

const verifyToken = (token, secret)=>{
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload); 
