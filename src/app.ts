import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import { router } from "./router";

dotenv.config();

const app = express();
// 1. Security Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// base routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running smoothly!" });
});
app.get("/heartbeat", (req: Request, res: Response): void => {
  //   req.log.info('Heartbeat ok');
  res.send("beating");
  return;
});

app.get("/v1", router);

export { app };
