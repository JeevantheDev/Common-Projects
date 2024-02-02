import { Request, Response } from "express";

export const errorHandler = (
  err: ResponseError,
  _req: Request,
  res: Response,
) => {
  const errorObj = { ...err };

  console.log("error :: ", errorObj.message, res);

  res?.status(errorObj.statusCode || 500).json({
    success: false,
    error: errorObj?.message || "Server Error",
  });
};
