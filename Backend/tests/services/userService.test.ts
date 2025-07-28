import * as userService from '../../src/services/userService';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock Prisma
jest.mock('@prisma/client', () => {
  const mUser = {
    findUnique: jest.fn(),
    create: jest.fn()
  };
  return {
    PrismaClient: jest.fn(() => ({ user: mUser }))
  };
});

const prismaMock = new PrismaClient() as any;

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}));

// Mock JWT
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn()
}));

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await userService.register({});
      expect(res.status).toBe(400);
    });

    it('should return 400 if passwords do not match', async () => {
      const res = await userService.register({
        name: 'Hari',
        username: 'hari',
        password: '123',
        reenterPassword: '456'
      });
      expect(res.status).toBe(400);
      expect(res.data.message).toMatch(/Passwords do not match/i);
    });

    it('should return 409 if username already exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue({ id: 1 });
      const res = await userService.register({
        name: 'Hari',
        username: 'hari',
        password: '123',
        reenterPassword: '123'
      });
      expect(res.status).toBe(409);
    });

    it('should register user and return 201', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      prismaMock.user.create.mockResolvedValue({
        id: 1,
        name: 'Hari',
        username: 'hari'
      });

      const res = await userService.register({
        name: 'Hari',
        username: 'hari',
        password: '123',
        reenterPassword: '123'
      });

      expect(res.status).toBe(201);
      expect(res.data.user?.username).toBe('hari');
    });
  });

  describe('login', () => {
    it('should return 400 if username or password is missing', async () => {
      const res = await userService.login({});
      expect(res.status).toBe(400);
    });

    it('should return 401 if user not found or password is invalid', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      const res = await userService.login({ username: 'x', password: 'y' });
      expect(res.status).toBe(401);
    });

    it('should return 401 if password does not match', async () => {
      prismaMock.user.findUnique.mockResolvedValue({ password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const res = await userService.login({ username: 'x', password: 'wrong' });
      expect(res.status).toBe(401);
    });

    it('should login user and return token', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 1,
        username: 'hari',
        password: 'hashed'
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fake-jwt-token');

      process.env.JWT_SECRET = 'test-secret';

      const res = await userService.login({ username: 'hari', password: '123' });

      expect(res.status).toBe(200);
      expect(res.data.token).toBe('fake-jwt-token');
    });
  });
});
