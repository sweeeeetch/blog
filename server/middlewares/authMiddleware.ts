import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error.js";
import TokenService from "../service/token-service.js";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export interface UserPayload {
  email: string;
  username: string;
  id: string;
}

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData as UserPayload;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}
