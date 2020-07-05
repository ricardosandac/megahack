import express from 'express';

import BooksController from './controllers/BooksController';
import ProfileController from './controllers/ProfileController';
import StickersController from './controllers/StickersController';
import QuestionsController from './controllers/QuestionsController';
import PupilResponsesController from './controllers/PupilResponsesController';
import PupilStickersController from './controllers/PupilStickersController';
import PupilBooksController from './controllers/PupilBooksController';

const routes = express.Router();
const booksController = new BooksController();
const profileController = new ProfileController();
const stickersController = new StickersController();
const questionsController = new QuestionsController();
const pupilResponsesController = new PupilResponsesController();
const pupilStickersController = new PupilStickersController();
const pupilBooksController = new PupilBooksController();

routes.post('/books', booksController.create);
routes.get('/books', booksController.index);
routes.get('/books/:id', booksController.show);

routes.post('/pupils', profileController.create);
routes.get('/pupils', profileController.index);
routes.get('/pupils/:id', profileController.show);

routes.post('/stickers', stickersController.create);
routes.get('/stickers', stickersController.index);
routes.get('/stickers/:id', stickersController.show);

routes.post('/questions', questionsController.create);
routes.get('/questions', questionsController.index);
routes.get('/questions/:id', questionsController.show);

routes.post('/pupilresponses', pupilResponsesController.create);
routes.get('/pupilresponses', pupilResponsesController.index);
routes.get('/pupilresponses/:id', pupilResponsesController.show);

routes.post('/pupilstickers', pupilStickersController.create);
routes.get('/pupilstickers', pupilStickersController.index);
routes.get('/pupilstickers/:id', pupilStickersController.show);

routes.post('/pupilbooks', pupilBooksController.create);
routes.get('/pupilbooks', pupilBooksController.index);
routes.get('/pupilbooks/:id', pupilBooksController.show);

export default routes;