import express from 'express';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';
import * as userController from './controllers/userController';

const router = express.Router();

// home route
router.get('/', userController.home);

// auth related routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// user related routes
router.use('/users', userRouter);

// post related routes
router.post('/posts', postRouter);

export default router;
