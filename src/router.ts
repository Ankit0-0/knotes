
import { Router, Request, Response } from 'express';
import userRouter from './features/user/router/user.router';

const router = Router();

router.use('/users', userRouter);

export { router };