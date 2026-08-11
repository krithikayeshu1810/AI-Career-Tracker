require("dotenv").config();

const fs = require("fs");
const pdf = require("pdf-parse");
const Groq = require("groq-sdk");

// ==========================================
// GROQ AI SETUP
// ==========================================

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

console.log(
  "Groq API key loaded:",
  process.env.GROQ_API_KEY ? "YES" : "NO"
);