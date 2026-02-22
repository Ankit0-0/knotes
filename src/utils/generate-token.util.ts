import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import e from "express";

dotenv.config();

const secret: Secret = process.env.JWT_SECRET as string;

const generateToken = (userId: string, role = "user"): string => {
  if (secret) {
    const token = jwt.sign({ userId, role }, secret, { expiresIn: "1h" });
    return token;
  }
  throw new Error("JWT secret is not defined");
};

export { generateToken };
