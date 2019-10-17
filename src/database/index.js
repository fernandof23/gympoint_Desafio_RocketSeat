import Sequelize from 'sequelize';
import User from '../app/models/User';
import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const connection = new Sequelize(databaseConfig);
    models.map(model => model.init(connection));
  }
}

export default new Database();
