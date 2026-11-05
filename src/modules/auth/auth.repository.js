import prisma from "../../config/prisma.js";

// Find user by email
export const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// Find user by username
export const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
};

// Find user by ID
export const findUserById = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
}
// Find user by email or username
export const findUserByEmailOrUsername = async (identifier) => {
  return prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier },
      ],
    },
  });
};

// Create new user
export const createUser = async ({
  email,
  username,
  passwordHash,
}) => {
  return prisma.user.create({
    data: {
      email,
      username,
      passwordHash,
    },
  });
};