import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const secret: Secret = process.env.JWT_SECRET as string;

interface AuthPayload {
  userId: string;
  role: string;
  dealerId: string;
}

// Augment the Express Request object to include custom properties
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      role?: string;
      dealerId?: string;
    }
  }
}

class AuthService {
  private secret: Secret;

  constructor(secret: Secret) {
    this.secret = secret;
  }

  public auth(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers.authorization?.split(" ")[1] || null;

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    try {
      const decodedToken = jwt.verify(token, this.secret) as AuthPayload;
      req.userId = decodedToken.userId;
      req.role = decodedToken.role;
      req.dealerId = decodedToken.dealerId;

      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  }
}


const authService = new AuthService(secret);

export const auth = authService.auth.bind(authService);
