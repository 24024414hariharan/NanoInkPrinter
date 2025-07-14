import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { generateRecommendation } from '../controllers/recommendController';
import { authenticateToken } from '../middleware/authMiddleware';
import { handleFeedback } from '../controllers/feedbackController';

const router = Router();

router.post('/', authenticateToken, asyncHandler(generateRecommendation));
router.post('/feedback', authenticateToken, asyncHandler(handleFeedback));

export default router;