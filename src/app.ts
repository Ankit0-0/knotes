import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import { router } from "./router";

dotenv.config();

const app: Application = express();

// 1. Security Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running smoothly!" });
});
app.get("/heartbeat", (req: Request, res: Response): void => {
  //   req.log.info('Heartbeat ok');
  res.send("beating");
  return;
});
app.use("/v1", router);


export { app };
