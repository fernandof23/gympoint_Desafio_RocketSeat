import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authController from './app/middlewares/auth';
import StudentController from './app/controllers/StudentController';
import PlansController from './app/controllers/PlansController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import MakeOrdersController from './app/controllers/MakeOrdersController';
import AnswerOrderController from './app/controllers/AnswerOrdersController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

// Checkins
routes.post('/students/:student_id/checkins', CheckinController.store);
routes.get('/students/:student_id/checkins', CheckinController.index);

// help-orders
routes.post('/students/:student_id/help-orders', MakeOrdersController.store);
routes.get('/students/:student_id/help-orders', MakeOrdersController.index);

// Rotas com controle de authenticação
routes.use(authController);

routes.put('/users', UserController.update);

// rotas de Crud dos estudantes
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students/:id', StudentController.show);
routes.get('/students', StudentController.index);
routes.delete('/students/:id', StudentController.delete);

// rota para acessar os planos
routes.post('/plans', PlansController.store);
routes.get('/plans', PlansController.index);
routes.put('/plans/:plan_id', PlansController.update);
routes.delete('/plans/:plan_id', PlansController.delete);

// Matricula
routes.post('/registration', RegistrationController.store);
routes.get('/registration', RegistrationController.index);
routes.put('/registration/:registration_id', RegistrationController.update);
routes.delete('/registration/:registration_id', RegistrationController.delete);

// Resposta das help-orders
routes.get('/help-orders', AnswerOrderController.index);
routes.post('/help-orders/:_id/answer', AnswerOrderController.store);

export default routes;
