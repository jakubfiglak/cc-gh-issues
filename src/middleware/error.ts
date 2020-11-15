import { ErrorRequestHandler } from 'express';
import { ErrorResponse } from '../utils/ErrorResponse';

export const errorHandler: ErrorRequestHandler = (
  err: ErrorResponse,
  req,
  res,
  next
) => {
  let error = { ...err };

  error.message = err.message;

  console.log(error);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    code: error.statusCode,
  });
};
