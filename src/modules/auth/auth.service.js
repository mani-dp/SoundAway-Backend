import argon2 from "argon2";
import AppError from "../../utils/AppError.js";
import * as authRepository from "./auth.repository.js";

export const registerUser = async ({ email, username, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim().toLowerCase();

  // Check email
  const existingEmail = await authRepository.findUserByEmail(
    normalizedEmail
  );

  if (existingEmail) {
    throw new AppError("Email is already registered.", 409);
  }

  // Check username
  const existingUsername = await authRepository.findUserByUsername(
    normalizedUsername
  );

  if (existingUsername) {
    throw new AppError("Username is already taken.", 409);
  }

  // Hash password
  const passwordHash = await argon2.hash(password);
  
  // Create user
  try {
    const user = await authRepository.createUser({
      email: normalizedEmail,
      username: normalizedUsername,
      passwordHash,
    });

    //data proejction ** important
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      emailVerifiedAt: user.emailVerifiedAt,
      createdAt: user.createdAt,
    };
    /////
  } catch (error) {
    if (error.code === "P2002") {
      const duplicatedField = error.meta?.target;

      if (duplicatedField?.includes("email")) {
        throw new AppError("Email is already registered.", 409);
      }

      if (duplicatedField?.includes("username")) {
        throw new AppError("Username is already taken.", 409);
      }

      throw new AppError("A unique field already exists.", 409);
    }

    throw error;
  }
};