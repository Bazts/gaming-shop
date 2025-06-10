import type { NextFunction, Request, Response } from "express"

type RouteHandler = (req: Request, res: Response, next: NextFunction) => void

export const asyncHandler = (fn: RouteHandler): RouteHandler => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next)
}