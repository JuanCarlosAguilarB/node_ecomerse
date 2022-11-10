const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    // encriptamos el password
    const hash = await bcrypt.hash(data.password,10); // el 10 hace referencia al numero de saltos que se realiza para hallar la encriptaci[on]]
    const newUser = await models.User.create({
      ...data, // clonamos todo el objeto 
      password: hash // resignamos el campo password por el hash del mismo
    });
    // no es recomendable devolver la contrase;a, así sea hasheada
    // por lo que podemos eliminarla 
    // delete newUser.password;
    // o utilizando sequalize, podemos parsear la respuesta
    delete newUser.dataValues.password; // para sequalize, en dataValues, se encuentran los datos
      // esta ultmima seria la forma adecuada de hacerlo  
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: {email}
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
