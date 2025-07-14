import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const registerUser = async (req: Request, res: Response) => {
  const result = await userService.register(req.body);
  res.status(result.status).json(result.data);
};

export const loginUser = async (req: Request, res: Response) => {
  const result = await userService.login(req.body);
  res.status(result.status).json(result.data);
};
