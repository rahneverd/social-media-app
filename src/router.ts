import express from 'express';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';
import * as userController from './controllers/userController';

const router = express.Router();

// router.get('/', (req: express.Request, res: express.Response) => {
//   res.render('home-guest');
// });

router.get('/', userController.home);

// auth related routes
// router.post('/login')

// user related routes
router.use('/users', userRouter);

// post related routes
router.post('/posts', postRouter);

export default router;
