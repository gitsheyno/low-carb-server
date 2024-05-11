import express from "express";
const express = require("express");
import morgan from "morgan";
import router from "./routers";
import cors from 'cors'
/**
 * App
 */
const app = express();

// Configure CORS to allow requests from 'http://localhost:3001'
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'], // Add other HTTP methods if needed
    credentials: true // Allow cookies to be sent
  }));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

/**
 * Our API
 */
app.use('/',router)

export default app;