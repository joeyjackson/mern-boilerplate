import { ErrorRequestHandler, RequestHandler } from "express";

export const sampleLogRequestTimeMiddleware: RequestHandler = (req, res, next) => {
  console.log("Request Timestamp:", Date.now());
  next();
}

export const sampleErrorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send("An error occurred");
}