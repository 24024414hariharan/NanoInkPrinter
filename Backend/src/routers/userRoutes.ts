import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/login', asyncHandler(loginUser));
router.post('/register', asyncHandler(registerUser));   

export default router;
