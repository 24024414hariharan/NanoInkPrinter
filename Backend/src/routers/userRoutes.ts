import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { loginSchema, registerSchema } from '../middleware/validators/userValidator';

const router = Router();

router.post('/login', validate(loginSchema), asyncHandler(loginUser));
router.post('/register', validate(registerSchema), asyncHandler(registerUser));   

export default router;