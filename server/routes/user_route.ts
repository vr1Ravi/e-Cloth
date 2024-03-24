import multer from "multer";
import express from "express";

import { activateUser, createUser } from "../controllers/user_controller";

const upload = multer({ dest: "uploads/" });

export const router = express.Router();

router.route("/create-user").post(upload.single("file"), createUser);
router.route("/activation").post(activateUser);
