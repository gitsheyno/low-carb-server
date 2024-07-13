import express from "express";
const express = require("express");
import morgan from "morgan";
import router from "./routers";
import cors from "cors";
import { createUser, loginUser } from "./handlers/user";
import { protect } from "./modules/auth";
/**
 * App
 */
const app = express();

// Configure CORS to allow requests from 'http://localhost:3001'
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH"], // Add other HTTP methods if needed
    credentials: true, // Allow cookies to be sent
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

/**
 * Our API
 */

app.use("/api", protect, router);
app.post("/signin", createUser);
app.post("/login", loginUser);
export default app;
