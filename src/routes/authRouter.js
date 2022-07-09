import { loginUser, createUser } from '../controllers/authController.js';
import { Router } from 'express';

const router = Router();

router.post('/login', loginUser);
router.post('/signup', createUser);

export default router;
