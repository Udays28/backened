import { Response } from "express";
import jwt from "jsonwebtoken";
import { NewUserRequestBody } from "../types/types.js";
import { BET_TOKEN } from "../constants/keys.js";

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "none" as "none",
  httpOnly: true,
  secure: true,
};

export const sendToken = (
  res: Response,
  user: NewUserRequestBody,
  code: number,
  message: string
) => {
  const key = BET_TOKEN;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

  return res.status(code).cookie(key, token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};
