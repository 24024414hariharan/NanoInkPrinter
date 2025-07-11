import { Request, Response } from "express";
import * as feedbackService from "../services/feedbackService";

export const handleFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).user?.id;
  const result = await feedbackService.processFeedback(req.body, userId);
  res.status(200).json(result);
};
