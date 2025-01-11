import { hashPass, createJWT, comparePasswords } from "../modules/auth";
import { turso } from "../db/tursoClient";
import { User, UserRequest } from "../modules/types";
/**
 * Create User
 */
export const createUser = async (req, res, next) => {
  const inComingUser: UserRequest = req.body;
  try {
    const hashedPassword = await hashPass(inComingUser.password);

    const sql = `
      INSERT INTO User (username, name, password, gender, weight, height, age, activity, goal)
      VALUES (:username, :name, :password, :gender, :weight, :height, :age, :activity, :goal)
    `;

    const result = await turso.execute({
      sql,
      args: {
        username: inComingUser.username,
        name: inComingUser.name,
        password: hashedPassword,
        gender: "",
        weight: 0,
        height: 0,
        age: 0,
        activity: "",
        goal: "",
      },
    });

    if (result.rowsAffected > 0) {
      const getUserSql = `SELECT * FROM User WHERE username = :username`;
      const userResult = await turso.execute({
        sql: getUserSql,
        args: { username: inComingUser.username },
      });

      const user = userResult.rows[0];
      const token = createJWT(user as unknown as User);

      res.json({ data: { username: user.username, token, name: user.name } });
    }
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const inComingUser = req.body;

    const sql = `SELECT * FROM User WHERE username = :username`;
    const result = await turso.execute({
      sql,
      args: { username: inComingUser.username },
    });

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ data: "login failed" });
    }

    const isValid = await comparePasswords(
      inComingUser.password,
      user.password as string
    );

    if (!isValid) {
      return res.status(401).json({ data: "login failed" });
    }

    const token = createJWT(user as unknown as User);

    res
      .status(200)
      .json({ data: { token, username: user.username, name: user.name } });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ data: { message: "Internal server error" } });
  }
};
