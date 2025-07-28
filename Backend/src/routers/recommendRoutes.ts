import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { generateRecommendation } from "../controllers/recommendController";
import { authenticateToken } from "../middleware/authMiddleware";
import { handleFeedback } from "../controllers/feedbackController";
import { validate } from "../middleware/validate";
import { recommendSchema } from "../middleware/validators/recommendValidator";
import { feedbackSchema } from "../middleware/validators/feedbackSchema";

const router = Router();

router.post(
  "/",
  authenticateToken,
  validate(recommendSchema),
  asyncHandler(generateRecommendation)
);
router.post(
  "/feedback",
  authenticateToken,
  validate(feedbackSchema),
  asyncHandler(handleFeedback)
);

export default router;
