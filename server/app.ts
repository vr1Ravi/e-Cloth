import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as user } from "./routes/user_route";

// env config.
dotenv.config({
  path: path.resolve(__dirname, "config/config.env"),
});

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/server", express.static("uploads"));
app.use("/api/v1", user);
export { app };
