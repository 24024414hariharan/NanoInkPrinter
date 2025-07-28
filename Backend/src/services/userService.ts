import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (body: any) => {
  const { name, username, password, reenterPassword } = body;

  if (!name || !username || !password || !reenterPassword) {
    return { status: 400, data: { message: 'All fields are required.' } };
  }

  if (password !== reenterPassword) {
    return { status: 400, data: { message: 'Passwords do not match.' } };
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return { status: 409, data: { message: 'Username already exists.' } };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, username, password: hashedPassword }
  });

  return {
    status: 201,
    data: {
      message: 'Registered successfully.',
      user: {
        id: user.id,
        name: user.name,
        username: user.username
      }
    }
  };
};

export const login = async (body: any) => {
  const { username, password } = body;

  if (!username || !password) {
    return { status: 400, data: { message: 'Username and password are required.' } };
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { status: 401, data: { message: 'Invalid credentials.' } };
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return {
    status: 200,
    data: {
      message: 'Login successful.',
      token
    }
  };
};
