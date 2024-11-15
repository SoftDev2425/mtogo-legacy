import { Express, Request, Response } from 'express';
import AuthRouter from './routes/auth.routes';
import { CustomRequest } from './types/CustomRequest';
import { validateSession } from './middlewares/sessions';
import {
  requireAdmin,
  requireCustomer,
  requireRestaurant,
  requireRoles,
} from './middlewares/role';
import { errorHandler } from './middlewares/errorHandler';

function routes(app: Express) {
  app.get('/', (_req: Request, res: Response) =>
    res.send(`Hello from MTOGO: Test Service!`),
  );

  app.get('/healthcheck', (_req: Request, res: Response) =>
    res.sendStatus(200),
  );

  app.use('/api/auth', AuthRouter);

  app.get(
    '/protected',
    validateSession,
    (req: CustomRequest, res: Response) => {
      res
        .status(200)
        .json({ message: 'You are authenticated!', email: req.email });
    },
  );

  // Protect a route and only allow customers
  app.get(
    '/customer-area',
    validateSession,
    requireCustomer,
    (req: CustomRequest, res: Response) => {
      res.status(200).json({ message: 'Welcome, customer!', email: req.email });
    },
  );

  // Protect a route and only allow restaurants
  app.get(
    '/restaurant-area',
    validateSession,
    requireRestaurant,
    (req: CustomRequest, res: Response) => {
      res
        .status(200)
        .json({ message: 'Welcome, restaurant owner!', email: req.email });
    },
  );

  // Protect a route and only allow admins
  app.get(
    '/admin-area',
    validateSession,
    requireAdmin,
    (req: CustomRequest, res: Response) => {
      res.status(200).json({ message: 'Welcome, admin!', email: req.email });
    },
  );

  // Protect a route and allow either customers or restaurants
  app.get(
    '/customer-or-restaurant-area',
    validateSession,
    requireRoles(['customer', 'restaurant']),
    (req: CustomRequest, res: Response) => {
      res.status(200).json({
        message: 'Welcome, customer or restaurant owner!',
        email: req.email,
      });
    },
  );

  app.use(errorHandler);

  // Catch unregistered routes
  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
}

export default routes;
