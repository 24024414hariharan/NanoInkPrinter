import { Router } from 'express';
import userRoutes from './userRoutes';
import recommendRoutes from './recommendRoutes';

const router = Router();
router.use('/auth', userRoutes);
router.use('/recommend', recommendRoutes);
export default router;
