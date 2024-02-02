import { decodeToken } from "../utils/jwt.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import { asyncHandler } from "./asyncHandler.js";

export const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //Make sure token exist
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    //Verify token
    const decoded = decodeToken(token);

    req.user = User.findById(decoded?.id as string, "id");

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
