import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  if (!err.isOperational) {
    console.error('Unexpected Error:', err);
  }

  res.status(statusCode).json({
    status: 'error',
    message,
  });
}

export default errorHandler;
