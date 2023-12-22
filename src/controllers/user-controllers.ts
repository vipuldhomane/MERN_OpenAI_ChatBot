import User from "../models/Users.js";
import { NextFunction, Request, Response } from "express";

import { compare, hash } from "bcrypt";

// get data of all the users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get all the users
    const users = await User.find();
    return res.status(201).json({ message: "Ok", users });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

// Controller for user signup
export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // user SignUp
    // Destructuring the body data into the variables for easy use
    const { name, email, password } = req.body;

    // Check if user already exits
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).send("User Already Registered");
    }

    // Encrypt the password before sending it to the database for the security reasons with the help of bcrypt
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    user.save();
    return res.status(200).json({ message: "Ok", userId: user._id.toString() });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

// LogIn Controller
export const userLogIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Destructuring the body data into the variables for easy use
    const { email, password } = req.body;

    // check if the user is registered
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not Registered");
    }
    // Check if password is correct. using compare fun from bcryct to check with encrypted password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect PassWord");
    }

    return res.status(201).json({ message: "Ok", userId: user._id.toString() });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "ERROR", cause: err.message });
  }
};
