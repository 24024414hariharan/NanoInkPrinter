import { Request, Response } from 'express';
import * as recommendService from '../services/recommendService';

export const generateRecommendation = async (req: Request, res: Response) => {
  const result = await recommendService.generate(req.body);
  res.status(200).json(result);
};