import express from "express";
import AuthController from "../controller/auth.controller.js";
import { validateConfirmEmail, validateLogin } from "../validations/auth.validation.js";
import { isAdmin } from "../middlewares/is-auth.js";
const authRouter = express.Router();
const authController = new AuthController();



// API Login
authRouter.post("/login",validateLogin,authController.login);


authRouter.post("/admin/login",validateLogin,authController.login);



// API Register
authRouter.post("/register", authController.register);

// API Logout
authRouter.get("/logout", authController.logout);

//API Change Password
authRouter.patch("/:id/change-password", authController.changePassword);

// API Request Password Reset
authRouter.post("/request-password-reset", validateConfirmEmail, authController.requestPasswordReset);

// API Reset Password
authRouter.post("/reset-password", authController.resetPassword);


authRouter.get("/fetch-login", authController.fetchUserData); 

export default authRouter;
