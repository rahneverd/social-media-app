import express from 'express';
import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.render('home-guest');
});

// auth related routes
// router.post('/login')

// user related routes
router.use('/users', userRouter);

// post related routes
router.post('/posts', postRouter);

export default router;
