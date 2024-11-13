import express from 'express';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', authController.handleLogin);


// a login for MTOGO platform only - administrator of the platform
// router.post('/login/admin', authController.handleLoginAdmin);

router.post('/register/customer', authController.handleRegisterCustomer);
router.post('/register/restaurant', authController.handleRegisterRestaurant);

router.post('/logout', authController.handleLogout);

export default router;
