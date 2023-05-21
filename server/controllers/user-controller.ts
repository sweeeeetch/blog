import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import UserService from "../service/user-service.js";
import ApiError from "../exceptions/api-error.js";

class UserController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }

      const { email, username, password } = req.body;
      const userData = await UserService.register(email, username, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "*.app",
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await UserService.logout(refreshToken);

      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
