import { NextFunction, Request, Response } from 'express';

export class UserController {


  heartbeat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
    //  const result = await this.userService.heartbeat();
        const result = "User beating";
      res.status(result ? 200 : 400).json(result);
    } catch (error) {
      next(error);
    }
  };


}
