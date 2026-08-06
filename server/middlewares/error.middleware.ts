import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.dir(err.response?.data, {
    depth: null,
  });

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
}
