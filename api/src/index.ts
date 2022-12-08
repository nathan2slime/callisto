// Dependencies
import express, { Response, Request, json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

// Utils
import log from './log';
import router from './routes';
import envs from '../env';

config();

const app = express();

app.use(json());
app.use(cors());
app.use('/api', router);

app.get('/', (req: Request, res: Response) =>
  res.json({
    name: 'Cars',
    version: 1.0,
  })
);

const port = envs.PORT || 8080;

if (envs.NODE_ENV != 'test') {
  app.listen(port, () => log.success(`server on http://localhost:${port}`));
}

export default app;
