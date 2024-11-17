import express from 'express';
import routes from '../routes';
import cors from 'cors';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173'],
    }),
  );

  routes(app);

  return app;
}

export default createServer;
