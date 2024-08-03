import express from 'express';
import dotenv from 'dotenv';
import router from './router';

// load environment variables
dotenv.config();

// initialize app
const app = express();

// set req data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set public
app.use(express.static('./public'));

// set views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// set router
app.use('/', router);

// start app
// app.listen(process.env.PORT, () => {
//   console.log(`server running on http://localhost:${process.env.PORT}`);
// });
export default app;
