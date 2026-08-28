import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  deleteUser,
  getUserProfile
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewear.js';

const router = Router();

// routes for user authentication and management
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/refresh-token').get(refreshAccessToken);
router.route('/change-password').put(verifyJWT, changePassword);
router.route('/delete-user').delete(verifyJWT, deleteUser);
router.route('/profile').get(verifyJWT, getUserProfile);

export default router;
