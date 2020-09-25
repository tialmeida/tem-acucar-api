import { Router } from 'express';
import BuilduingsController from './app/controllers/BuildingsController';
import ResidentsController from './app/controllers/ResidentController';
import FavorsController from './app/controllers/FavorsController';
import NotificationController from './app/controllers/NotificationController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/buildings', BuilduingsController.create);
routes.post('/residents', ResidentsController.create);
routes.post('/login', SessionController.create);

routes.use(authMiddleware)

// Building
routes.put('/buildings/:id', BuilduingsController.update);
routes.delete('/buildings/:id', BuilduingsController.delete);

// Residents
routes.get('/residents', ResidentsController.index);
routes.get('/residents/all', ResidentsController.list);
routes.put('/residents/:id', ResidentsController.update);

// Favors
routes.post('/favors', FavorsController.create);
routes.put('/favors', FavorsController.update);
routes.get('/favors', FavorsController.list);
routes.get('/favors/:id', FavorsController.index);

// Notifications
routes.get('/notifications', NotificationController.list)
routes.get('/notifications/:id', NotificationController.delete)

console.log('carregado');

export default routes;