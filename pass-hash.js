// este sera un ejemplo de como utilizar esta libreria para realizar 
// encriptaciones, para hash y demas

const bcrypt = require('bcrypt');

async function hashPassword(){
    
    const myPassword = 'admin asdf.asdf'
    
    // es asincrono
    const hash = await bcrypt.hash(myPassword,10); // el 10 hace referencia al numero de saltos que se realiza para hallar la encriptaci[on]]
    console.log(hash)
    // comparamos el texto de la clave contra el hash que guardamos en la base de datos
    const isMatch = await bcrypt.compare(myPassword,'$2b$10$gnNFFm1RhhG3PkbibyZ20u/Fu03.pC8QFn/ICQCzz/Uja9vy0Es6S')
    console.log(isMatch, 'resul of compare')
}


hashPassword();
