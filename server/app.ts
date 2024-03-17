import express from "express";
import dotenv from "dotenv";
import path from "path";

// env config.
dotenv.config({
  path: path.resolve(__dirname, "config/config.env"),
});

const app = express();

export { app };
