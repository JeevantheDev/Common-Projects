import express from "express";
import {
  getCurrentUser,
  googleAuth,
  googleAuthCallback,
  googleAuthFail,
  googleAuthSuccess,
  homePage,
} from "../controllers/index.js";
import { protect } from "../middleware/protect.js";

const authRouter = express.Router();

authRouter.get("/", homePage);
authRouter.get("/me", protect, getCurrentUser);
authRouter.get("/google", googleAuth);
authRouter.get("/google/callback", googleAuthCallback);
authRouter.get("/google/callback/success", googleAuthSuccess);
authRouter.get("/google/callback/fail", googleAuthFail);

export { authRouter };
