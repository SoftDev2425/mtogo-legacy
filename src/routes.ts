import { Express, Request, Response } from 'express';
import AuthRouter from './routes/auth.routes';
import RestaurantRouter from './routes/restaurant.routes';
import { errorHandler } from './middlewares/errorHandler';

function routes(app: Express) {
  app.get('/', (_req: Request, res: Response) =>
    res.send(`Hello from MTOGO LEGACY MONOLITHIC backend!`),
  );

  app.get('/healthcheck', (_req: Request, res: Response) =>
    res.sendStatus(200),
  );

  app.use('/api/auth', AuthRouter);

  app.use('/api/restaurant', RestaurantRouter);

  app.use(errorHandler);

  // Catch unregistered routes
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
}

export default routes;
