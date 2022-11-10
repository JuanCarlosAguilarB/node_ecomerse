
const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UserService = require('./user.service');
const service = new UserService();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// traemos el apikey
const { config } = require("../config/config");

class AuhtServices {

  async getUser(email, password) {
    const user = await service.findByEmail(email)
    // validaci[o]n de si no existe nigun usuario
    if (!user) {
      throw boom.unauthorized();
    }
    // validación password 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  async signToken(user) {

    const { email } = req.email;

    const payload = {
      sub: user.id, // es la forma en la que vamos a identificar al usuario. hace parte dedl estandar 
      // el sub es como el identificador del token
      role: user.role // podemos agregar los valores que queramos, 
      // pero lo minimo es el sub
    }

    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }


  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    // generamos el token para regenerar la contrase;na 
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    // pasamos el token como un query parameter
    const link = `http://front-vista-recovery-password?token=${token}`;
    // Por segurar, este token deberiamos guardarlo en la db y luego verificar que sea el del mismo
    // ademas, debemos colocarle un tiempo de expiraci[on]
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: `"Foo Boo 👻" <${config.mailerEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar contrasena', // Subject line
      text: 'Estoy usando Nodemailer!', // plain text body
      html: `'<b> Ingresa a esta link para generar contrasena ${link}</b>'`, // html body
    }
    const rta = await this.sendMail(mail);

    return rta;
  }


  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (!user) {
        throw boom.unauthorized();
      }
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10); // el 10 hace referencia al numero de saltos que se realiza para hallar la encriptaci[on]]
      await service.update(user.id, { recoveryToken: null, password: hash });
      
      return { message: "password changed"}
    
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.mailerEmail,
        pass: config.mailerPassword,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}
module.exports = AuhtServices;