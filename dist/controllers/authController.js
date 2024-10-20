import { User } from "../models/User.js";
import { sendToken } from "../utils/tokenUtils.js";
import { compare } from "bcrypt";
import { TryCatch } from "../middleware/error.js";
import ErrorHandler from "../utils/utility-class.js";
const registerUser = TryCatch(async (req, res, next) => {
    const { name, email, password, referalCode, phone, gender, _id } = req.body;
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            msg: `Welcome back, ${user.name}!`,
        });
    }
    if (!_id || !name || !email || !password || !phone || !gender || !referalCode)
        return next(new ErrorHandler("Please enter all fields", 400));
    user = await User.create({ name, email, password, referalCode, phone, gender, _id });
    res.status(201).json({
        success: true,
        msg: `Welcome, ${user.name}`,
    });
});
const loginUser = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return next(new ErrorHandler("User not found", 404));
    const isMatch = await compare(password, user.password);
    if (!isMatch)
        return next(new ErrorHandler("Invalid Credentials", 400));
    sendToken(res, user, 200, `Welcome back, ${user.name}`);
});
const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("Invalid ID!", 400));
    res.status(200).json({
        success: true,
        user,
    });
});
const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
});
export { loginUser, registerUser, getUser, getAllUsers };
