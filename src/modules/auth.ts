import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./types";

/**
 * hash password
 */
export const hashPass = (password: string): string => {
  return bcrypt.hash(password, 5);
};

/**
 * Compare hashed pass
 */
export const comparePasswords = (password: string, hash: string): boolean => {
  return bcrypt.compare(password, hash);
};

/**
 * Create Token
 */
export const createJWT = (user: User) => {
  const token = jwt.sign({ id: user.id, username: user.username }, "shayan");

  return token;
};

/**
 * protected routes middleware
 */

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  console.log("bearer", bearer);
  if (!bearer) {
    res.status(401).json({ data: { message: "not authorized" } });
  }

  const [_, token] = bearer.split(" ");

  console.log("token", token);
  try {
    const user = jwt.verify(token, "shayan");
    console.log("user", user);
    req.user = user;
    next();
  } catch (e) {
    console.log(`error in auth ${e}`);
    res.status(401).json({ data: { message: "not valid token" } });
    return;
  }
};
