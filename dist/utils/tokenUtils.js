import jwt from "jsonwebtoken";
import { BET_TOKEN } from "../constants/keys.js";
const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
};
export const sendToken = (res, user, code, message) => {
    const key = BET_TOKEN;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(code).cookie(key, token, cookieOptions).json({
        success: true,
        user,
        message,
    });
};
