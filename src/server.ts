import express from "express";
const express = require("express");
import morgan from "morgan";
import router from "./routers";
import cors from "cors";
import { createUser, loginUser } from "./handlers/user";
import { protect } from "./modules/auth";
import OpenAI from 'openai';

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

// app.get("/api", (req, res, next) => {
//   setTimeout(() => {
//     next(new Error("hello"));
//   }, 1000);
// });

app.use("/api", protect, router);
app.post("/signin", createUser);
app.post("/login", loginUser);

app.get("/chat", async(req,res)=>{

  // const openai = new OpenAI({
  //   apiKey: "sk-proj-b3mxwV5L1WkhaYjsApF1T3BlbkFJzhZjkbw9lBnZkst9SyTp", // This is the default and can be omitted
  // });
  
  // async function main() {
  //   const chatCompletion = await openai.chat.completions.create({
  //     messages: [{ role: 'user', content: 'Say this is a test' }],
  //     model: 'gpt-3.5-turbo',
  //   });
  //   console.log("res",chatCompletion)
  // }
  // main();

  const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': '05800b0e55msh61a4e11ced57cfbp1cf8f0jsn2c26d2886151',
		'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		messages: [
			{
				role: 'user',
				content: 'hello'
			}
		],
		system_prompt: '',
		temperature: 0.9,
		top_k: 5,
		top_p: 0.9,
		max_tokens: 256,
		web_access: false
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result , "res");
} catch (error) {
	console.error(error);
}
})

app.use((err, req, res, next) => {
  console.log(`something went wrong : ${err}`);
  if (err.type === "auth") {
    res.status(401).json({ message: "un authorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "oops, thats on me" });
  }
});
export default app;
