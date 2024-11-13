import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/login/customer', (_req, res) => {
  res.status(400).json({ message: 'Login should be done via POST' });
});
router.post('/login', authController.handleLogin);

router.post('/register/customer', authController.handleRegisterCustomer);
router.post('/register/restaurant', authController.handleRegisterRestaurant);

router.post('/logout', authController.handleLogout);

export default router;
