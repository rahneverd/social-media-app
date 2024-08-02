import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();

// set public
app.use(express.static('./public'));
// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('home-guest');
});

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
