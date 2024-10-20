import jwt from "jsonwebtoken";
import { BET_TOKEN } from "../constants/keys.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import { User } from "../models/User.js";
export const isAuthenticated = TryCatch(async (req, res, next) => {
    const token = req.cookies[BET_TOKEN];
    if (!token)
        return next(new ErrorHandler("Please login to access this route", 401));
    const secret = process.env.JWT_SECRET;
    const data = jwt.verify(token, secret);
    console.log(data);
    req.user = data;
    next();
});
export const AdminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler("Login First!", 401));
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Invalid ID!", 401));
    if (user.role !== "admin")
        return next(new ErrorHandler("You Are Not Admin!", 403));
    next();
});
