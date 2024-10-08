import express from 'express';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';
import * as userController from './controllers/userController';
import apiPostRouter from './routes/apiPostRouter';

const router = express.Router();

// home route
router.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json('Server running').end();
});

// auth related routes
router.post('/register', userController.apiRegister);
router.post('/login', userController.apiLogin);
router.post(
  '/refresh-token',
  userController.apiMustBeLoggedIn,
  userController.apiRefreshToken
);
router.post('/logout', userController.apiLogout);

// user related routes
// router.use('/users', apiUserRouter);

// post related routes
router.use('/posts', apiPostRouter);

export default router;
