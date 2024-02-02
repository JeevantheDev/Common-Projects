import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();

import { errorHandler } from "./middleware/index.js";

//route files
import { passportInit } from "./controllers/index.js";
import { authRouter } from "./routes/index.js";

//Load env vars
dotenv.config({ path: `${__dirname}/src/config/.env.${process.env.NODE_ENV}` });

const app = express();

const { initialize: passportInitialize, session: passportSession } =
  passportInit();

//cors
app.use(
  cors({
    origin: "*",
  }),
);

// session
app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: true,
    saveUninitialized: true,
  }),
);

// Initialize Passport
app.use(passportInitialize);
app.use(passportSession);

// body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// api routes
app.use("/api/v1/auth", authRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV || "dev"} mode on port ${PORT}`,
  ),
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err: ResponseError) => {
  console.log(`Error: ${err.message}`);
  //Close Server and exit process
  server.close(() => process.exit(1));
});
