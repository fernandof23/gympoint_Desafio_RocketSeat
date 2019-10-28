import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import User from '../app/models/User';
import Student from '../app/models/Student';
import databaseConfig from '../config/database';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';
import Checkins from '../app/models/Checkins';

const models = [User, Student, Plan, Registration, Checkins];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(
        model => model.assossiate && model.assossiate(this.connection.models)
      );
  }
}

export default new Database();
