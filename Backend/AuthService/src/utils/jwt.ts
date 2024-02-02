import jwt, { type Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();

//Load env vars
dotenv.config({ path: `${__dirname}/src/config/.env.${process.env.NODE_ENV}` });

const jwtSecret = process.env.SECRET_KEY as Secret;

export const validToken = (accessToken: string): boolean => {
  jwt.verify(accessToken, jwtSecret, (error) => {
    if (error) return false;

    return true;
  });

  return true;
};

export const generateAccessToken = (payload: JWTPayload): string => {
  const accessToken = jwt.sign(payload, jwtSecret, {
    expiresIn: Date.now() + 60 * 1000 * 48,
  });

  return accessToken;
};

export const decodeToken = (accessToken?: string): null | JWTPayload => {
  if (!accessToken) return null;

  if (!jwt.decode(accessToken)) return null;

  const decodedData = jwt.verify(accessToken, jwtSecret) as JWTPayload;

  return decodedData;
};
