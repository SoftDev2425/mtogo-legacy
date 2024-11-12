import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/login/user', (_req, res) => {
  res.status(400).json({ message: 'Login should be done via POST' });
});
router.post('/login/user', authController.handleLoginUser);
router.post('/login/restaurant', authController.handleLoginRestaurant);

router.post('/logout', authController.handleLogout);

router.post('/register/user', authController.handleRegisterUser);
router.post('/register/restaurant', authController.handleRegisterRestaurant);

export default router;
