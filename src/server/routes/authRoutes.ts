import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", registerUser);
router.post("/login", asyncHandler(loginUser));
router.get("/logout", logoutUser)

export default router;
