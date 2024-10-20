import express from "express";
import { getAllUsers, getUser, loginUser, registerUser } from "../controllers/authController.js";
import { AdminOnly, isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(isAuthenticated);

router.get("/all", AdminOnly, getAllUsers)
router.route("/:id").get(getUser);

export default router;
