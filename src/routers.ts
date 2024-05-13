import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .json({
      data: { message: "welcome to protected page", user: req.user.username },
    });
});

router.post("/", (req, res) => {
  res
    .status(200)
    .json({ message: "hello from next log in page", user: req.body.username });
});

export default router;
