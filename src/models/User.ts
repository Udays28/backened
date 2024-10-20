import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface Iuser extends Document{
  _id: string;
  name: string;
  email: string;
  password: string;
  referalCode: string;
  phone: number;
  gender: "male" | "female" | "other";
  role: "admin" | "user";
}

const userSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select:false },
  referalCode: { type: String, default: null },
  phone: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model<Iuser>("User", userSchema);
