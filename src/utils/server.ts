import express from 'express';
import routes from '../routes';
import cookieParser from 'cookie-parser';

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  routes(app);

  return app;
}

export default createServer;
