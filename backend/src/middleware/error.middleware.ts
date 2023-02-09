import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ErrorClient from '../utils/ErrorClient';

const errorMiddleware: ErrorRequestHandler = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err instanceof ErrorClient) {
    return res.status(err.statusCode).json({ type: err.type, message: err.message });
  }
  
  return res.status(500).json({ message: 'Internal error' });
};

export default errorMiddleware;
