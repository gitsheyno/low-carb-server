import { hashPass, createJWT, comparePasswords } from "../modules/auth";
import prisma from "../db";
import { UserRequest } from "../modules/types";
/**
 * Create User
 */

export const createUser = async (req, res, next) => {
  const inComingUser: UserRequest = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username: inComingUser.username,
        name: inComingUser.name,
        password: await hashPass(inComingUser.password),
        gender: "",
        weight: 0,
        height: 0,
        age: 0,
        activity: "",
        goal: "",
      },
    });

    const token = createJWT(user);
    res.json({ data: { username: user.username, token, name: user.name } });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const inComingUser = req.body;

    // Find user by username
    const user = await prisma.user.findUnique({
      where: {
        username: inComingUser.username,
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        data: "login failed",
      });
    }

    // Validate password
    const isValid = await comparePasswords(
      inComingUser.password,
      user.password
    );

    if (!isValid) {
      return res.status(401).json({
        data: "login failed",
      });
    }

    // Generate token if authentication is successful
    const token = createJWT(user);

    res
      .status(200)
      .json({ data: { token, username: user.username, name: user.name } });
  } catch (error) {
    // Log and handle unexpected errors
    console.error("Error logging in user:", error);
    res.status(500).json({ data: { message: "Internal server error" } });
  }
};
