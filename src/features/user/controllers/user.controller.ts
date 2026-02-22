import { NextFunction, Request, Response } from "express";

import { UserService } from "../services/user.service";
import { LoginInputTypes, RegisterInputTypes } from "../types/user.types";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  heartbeat = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      //  const result = await this.userService.heartbeat();
      const result = "User beating";
      res.status(result ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request<{}, {}, LoginInputTypes>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const loginInputObject: LoginInputTypes = req.body;
      const result = await this.userService.login(loginInputObject);
      res.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  };

  register = async ( 
    req: Request<{}, {}, RegisterInputTypes>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const registerInputObject: RegisterInputTypes = req.body;
      const result = await this.userService.register(registerInputObject);
      res.status(result.status === "success" ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.userId; // assume userId is set by auth middleware

      if(userId) {
        const result = await this.userService.getProfile(userId);
        res.status(result.status === "success" ? 200 : 400).json(result);
      }
    } catch (error) {
      next(error);
    }
  }
}

