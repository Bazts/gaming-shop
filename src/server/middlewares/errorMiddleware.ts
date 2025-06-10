import type { NextFunction, Request, Response } from "express"
import type { ErrorHandler } from "../utils/errorHandler"

export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const { message, details, statusCode } = err

  res
    .status(statusCode)
    .json({
      success: true,
      message,
      details
    }) 
}
