import express from 'express';
import authController from '../controllers/auth.controller';
import isAdmin from '../middleware/isAdmin';

const router = express.Router();

router.post('/login', authController.handleLogin);

// a login for MTOGO platform only - administrator of the platform
router.post('/login/admin', isAdmin, authController.handleLogin);

router.post('/register/customer', authController.handleRegisterCustomer);
router.post('/register/restaurant', authController.handleRegisterRestaurant);

// router.post('/logout', authController.handleLogout);

export default router;
