const express = require('express');
const passport = require('passport');
// const jwt = require('jsonwebtoken');

// no requerimos de un schema porque el strategy ya tra su esquema y su validacion.

const router = express.Router();

// // traemos el apikey
// const {config} = require("./../config/config");


const AuhtServices = require("../services/auth.service")
const service = new AuhtServices();


router.post('/login',
  passport.authenticate('local', {session: false}), // llamamos al middleware y una vez este  termine ya nos entrega los campos del login
  // si todo sale bien, este middleware deja la info del login en el .user del request
  async (req, res, next) => {
    try {

      const user = req.user;
      
      // const payload = {
      //   sub: user.id, // es la forma en la que vamos a identificar al usuario. hace parte dedl estandar 
      //           // el sub es como el identificador del token
      //   role: user.role // podemos agregar los valores que queramos, 
      //               // pero lo minimo es el sub
      //  }

      // const token = jwt.sign(payload, config.jwtSecret);

        res.json(service.signToken(user));
    } 
    catch (error) {
      next(error);
    }
  }
);


// servicio para cambiar el password
router.post('/change-password',
  async (req, res, next) => {
    // nos falta la capa de validacion
    try {

      const {token, newPassword} = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);      
    } 
    catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    // nos falta la caap de validacion de datos
    try {

      const {email} = req.email;
      const rta = await service.sendRecovery(email);
      res.json(rta);      
    } 
    catch (error) {
      next(error);
    }
  }
);

module.exports = router;
