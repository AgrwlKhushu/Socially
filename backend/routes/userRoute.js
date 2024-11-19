import express from "express";
import {
	loginUser,
	logoutUser,
	myProfile,
	registerUser,
	resendLoginOtp,
	resendOtp,
	updateUser,
	verifyLoginOtp,
	verifyUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/verify/:id", verifyUser);

userRouter.get("/resend/:id", resendOtp);

userRouter.post("/login", loginUser);

userRouter.post("/login/verify/:id", verifyLoginOtp);

userRouter.get("/login/resend/:id", resendLoginOtp);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/my/profile", isAuthenticated, myProfile);

userRouter.patch("/update/profile", isAuthenticated, updateUser);

export default userRouter;
