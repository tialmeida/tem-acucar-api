import { Router } from 'express';
import multer from 'multer';
import BuilduingsController from './app/controllers/BuildingsController';
import ResidentsController from './app/controllers/ResidentController';
import CategoryController from './app/controllers/CategoryController';
import SealController from './app/controllers/SealController';
import FavorsController from './app/controllers/FavorsController';
import AcceptedFavorsController from './app/controllers/AceptedFavorsController';
import NotificationController from './app/controllers/NotificationController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ActiveResidentController from './app/controllers/ActiveResidentController';
import authMiddleware from './app/middlewares/auth';
import superUserMiddleware from './app/middlewares/superUser';
import ownerMiddleware from './app/middlewares/owner';

import multerConfig from './config/multer';
import FavorsItemsController from './app/controllers/FavorsItemsController';

const upload_avatar = multer(multerConfig.avatar);

const routes = new Router();

routes.post('/buildings', BuilduingsController.create);
routes.post('/residents', upload_avatar.single('avatar'), ResidentsController.create);
routes.post('/login', SessionController.create);

routes.put('/buildings/:id', superUserMiddleware, BuilduingsController.update);

//Seals
routes.post('/seals', superUserMiddleware, SealController.create);

//Category
routes.post('/categories', superUserMiddleware, CategoryController.create);
routes.put('/categories', superUserMiddleware, CategoryController.update);
routes.delete('/categories', superUserMiddleware, CategoryController.delete);

routes.use(authMiddleware);

// Building

routes.delete('/buildings/:id', BuilduingsController.delete);

// Residents
routes.get('/residents', ResidentsController.index);
routes.get('/residents/all', ResidentsController.list);
routes.put('/residents/:id', ResidentsController.update);
routes.put('/actives/residents', ownerMiddleware, ActiveResidentController.update);
routes.put('/photos/residents', upload_avatar.single('avatar'), FileController.update);
routes.delete('/photos/residents', FileController.delete);

// Favores
routes.post('/favors', FavorsController.create);
routes.get('/favors', FavorsController.list);
routes.get('/favors/:id', FavorsController.index);
routes.get('/my/favors', FavorsController.listMyFavors);
routes.put('/favors/:id', FavorsController.update);
routes.delete('/favors/:id', FavorsController.delete);

// Aceitar favores
routes.post('/favors/accept/:id', AcceptedFavorsController.create);
routes.get('/my/favors/accept', AcceptedFavorsController.list);
routes.delete('/my/favors/giveup/:id', AcceptedFavorsController.delete);

// Items
routes.post('/items/:idFavor', FavorsItemsController.create);
routes.get('/items/:idFavor', FavorsItemsController.list);
routes.put('/items/:idItem', FavorsItemsController.update);
routes.delete('/items/:idItem', FavorsItemsController.delete);

//Categories
routes.get('/categories', CategoryController.list);

// Notifications
routes.get('/notifications', NotificationController.list);
routes.delete('/notifications/:id', NotificationController.delete);

export default routes;
