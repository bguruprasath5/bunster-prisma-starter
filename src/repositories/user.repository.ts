import { User } from '@prisma/client';
import db from '../db';

async function getAllUsers(): Promise<User[]> {
  return db.user.findMany({
    where: {
      deletedAt: null,
    },
  });
}

async function getUserById(id: number): Promise<User | null> {
  return db.user.findUnique({
    where: { id },
  });
}

async function getUserByEmail(email: string): Promise<User | null> {
  return db.user.findUnique({
    where: { email },
  });
}

async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  return db.user.create({
    data,
  });
}

async function updateUser(
  id: number,
  data: Partial<Omit<User, 'id'>>
): Promise<User> {
  return db.user.update({
    where: { id },
    data,
  });
}

async function softDeleteUser(id: number): Promise<User> {
  return db.user.update({
    where: { id },
    data: {
      isActive: false,
      deletedAt: new Date(),
    },
  });
}

export default {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  softDeleteUser,
};
