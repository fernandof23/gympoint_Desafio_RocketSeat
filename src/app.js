import express from 'express';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.router();
  }

  middlewares() {
    this.server.use(express.json());
  }

  router() {
    this.server.use(routes);
  }
}

export default new App();
