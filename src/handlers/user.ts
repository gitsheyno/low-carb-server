import { hashPass, createJWT, comparePasswords } from "../modules/auth";
import prisma from "../db";
import { UserRequest } from "../modules/types";
/**
 * Create User
 */

export const createUser = async (req, res) => {
  const inComingUser: UserRequest = req.body;

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
};

export const loginUser = async (req, res) => {
  const inComingUser: UserRequest = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: inComingUser.username,
    },
  });

  const isValid = await comparePasswords(inComingUser.password, user.password);

  if (!isValid) {
    res.status(401).json({ data: { message: "user not Found" } });
    return;
  }
  const token = createJWT(user);

  res
    .status(200)
    .json({ data: { token, username: user.username, name: user.name } });
};
