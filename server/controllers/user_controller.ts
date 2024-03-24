import { Request, Response } from "express";
import { User } from "../models/user_model";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendMail";
interface ICreateUser {
  name: String;
  email: String;
  password: String;
  avatar?: String;
}
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Invalid credeantials",
      });
    }
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const userImg = req.file?.path;

    const newUser: ICreateUser = {
      name,
      email,
      password,
      avatar: userImg,
    };

    const activation_token = createActivationToken(newUser);
    const activation_url = `http://localhost:5173/activation/${activation_token}`;

    try {
      await sendEmail({
        email: newUser.email,
        subject: "Activate Your Account",
        message: `Hello ${newUser.name}, please click on the link to activate your account: ${activation_url}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${newUser.email} to activate your account!`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//  Generate activation Token
function createActivationToken(user: ICreateUser) {
  return jwt.sign(user, process.env.ACTIVATION_SECRET as string, {
    expiresIn: "5m",
  });
}

// Activate user
export const activateUser = async (req: Request, res: Response) => {
  try {
    const { activation_token } = req.body;
    let new_user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    );

    if (!new_user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const { name, email, password, avatar } = new_user as ICreateUser;
    new_user = await User.create({
      name,
      email,
      password,
      avatar,
    });
    const token = new_user.generateJwtToken();
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        // sameSite: "none",
        // secure: true,
      })
      .json({
        success: true,
        new_user,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
