import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
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
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
/** useTempFiles: true, this is telling fileUpload to save the uploaded file to a temporary location on your server's
 *  filesystem instead of storing it in memory. Which is good storing large file in memory can arise performance issue
 * useTempFiles: true allows you to process large files asynchronously, which can further reduce memory usage. */
export { app };
