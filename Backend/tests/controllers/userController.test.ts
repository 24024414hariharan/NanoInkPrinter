import { registerUser, loginUser } from '../../src/controllers/userController';
import * as userService from '../../src/services/userService';
import { Request, Response } from 'express';

const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should return the response from userService.register', async () => {
      const req = {
        body: { username: 'testuser', password: 'password123' }
      } as Request;

      const res = mockResponse();

      const mockResult = {
        status: 201,
        data: { message: 'User registered successfully' }
      };

      jest.spyOn(userService, 'register').mockResolvedValue(mockResult);

      await registerUser(req, res);

      expect(userService.register).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResult.data);
    });
  });

  describe('loginUser', () => {
    it('should return the response from userService.login', async () => {
      const req = {
        body: { username: 'testuser', password: 'password123' }
      } as Request;

      const res = mockResponse();

      const mockResult = {
        status: 200,
        data: {  message: 'Login successful.', token: 'fake-jwt-token' }
      };

      jest.spyOn(userService, 'login').mockResolvedValue(mockResult);

      await loginUser(req, res);

      expect(userService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult.data);
    });
  });
});
