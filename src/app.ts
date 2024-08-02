import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('server running').end();
});

app.listen(process.env.PORT, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});
