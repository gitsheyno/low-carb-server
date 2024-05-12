import * as bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { User } from "./types"

/**
 * hash password
 */
export const hashPass = (password : string) : string =>{
    return bcrypt.hash(password , 2)
}

/**
 * Compare hashed pass
 */
export const comparePasswords = (password : string, hash : string) : boolean => {
    return bcrypt.compare(password, hash);
  };

/**
 * Create Token
 */
export const createJWT = (user : User) => {
    const token = jwt.sign(
      { id: user.id, username: user.username },
       "shayan"
    );

    return token;
  };