import express, { Response } from 'express';
import authController from '../controllers/auth.controller';
import { validateSession } from '../middlewares/sessions';
import { CustomRequest } from '@/types/CustomRequest';

const router = express.Router();

router.get(
  '/validate',
  validateSession,
  (req: CustomRequest, res: Response) => {
    res.status(200).json({ message: 'Session is valid', email: req.email });
  },
);

router.post('/login', authController.handleLogin);

router.post('/register/customer', authController.handleRegisterCustomer);
router.post('/register/restaurant', authController.handleRegisterRestaurant);

// router.post('/logout', authController.handleLogout);

export default router;
