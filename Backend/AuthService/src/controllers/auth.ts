import("../utils/passport.js");
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/index.js";
import ErrorResponse from "../utils/errorResponse.js";
import { GoogleAuthProfile } from "../types/user.js";
import { generateAccessToken } from "../utils/jwt.js";
import dotenv from "dotenv";
import path from "path";
import User from "../models/User.js";

const __dirname = path.resolve();

//Load env vars
dotenv.config({ path: `${__dirname}/src/config/.env.${process.env.NODE_ENV}` });

export const passportInit = () => {
  return { initialize: passport.initialize(), session: passport.session() };
};

export const homePage = asyncHandler(async (req, res: Response) =>
  res.send("<h1>Welcome to google Auth</h1>"),
);

//@desc     Google Auth
//@route    Get /api/v1/auth/google
//@access   Public
export const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

//@desc     Google Auth Callback
//@route    Get /api/v1/auth/google/callback
//@access   Public
export const googleAuthCallback = asyncHandler(
  passport.authenticate("google", {
    successRedirect: "/api/v1/auth/google/callback/success",
    failureRedirect: "/api/v1/auth/google/callback/fail",
  }),
);

//@desc     Google Auth Callback Success
//@route    Get /api/v1/auth/google/callback/success
//@access   Public
export const googleAuthSuccess = (req: Request, res: Response) => {
  if (!req.user) {
    res.redirect("/api/v1/auth/google/callback/fail");
  }

  const { user } = req;
  const { id, emails, accessToken } = user as GoogleAuthProfile;

  const tokenPayload = {
    id,
    token: accessToken,
    email: emails?.length ? emails[0].value : "",
  };

  const newAccessToken = generateAccessToken(tokenPayload);
  const redirectURL = `${process.env.CLIENT_REDIRECT_URL}?accessToken=${newAccessToken}`;

  const userExist = User.findById(id, "id");

  if (!userExist) {
    User.create(user);
  }

  res.redirect(redirectURL);
};

//@desc     Google Auth Callback Fail
//@route    Get /api/v1/auth/google/callback/fail
//@access   Public
export const googleAuthFail = asyncHandler(
  async (_req: Request, _res: Response, next: NextFunction) => {
    return next(new ErrorResponse("Something went wrong!!!", 500));
  },
);

//@desc     Get current loggedin user
//@route    Get /api/v1/auth/me
//@access   Public
export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = User.findById((req?.user as GoogleAuthProfile)?.id, "id");

    res.status(200).json({
      success: true,
      data: user,
    });
  },
);
