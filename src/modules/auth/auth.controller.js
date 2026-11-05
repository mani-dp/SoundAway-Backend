import { registerUser } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};