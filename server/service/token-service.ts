import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../index.js";
import { Token } from "@prisma/client";
dotenv.config();

interface PayloadObj {
  email: string;
  username: string;
  id: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

class TokenService {
  static generateTokens(payload: PayloadObj): Tokens {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "6h" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "30d" });

    return { accessToken, refreshToken };
  }

  static async saveTokens(userId: string, refreshToken: string): Promise<Token> {
    const tokenData = await prisma.token.findUnique({ where: { userId } });
    if (tokenData) {
      return await prisma.token.update({
        where: { userId },
        data: {
          refreshToken: refreshToken,
        },
      });
    }

    const token = await prisma.token.create({ data: { userId, refreshToken } });
    return token;
  }

  static async removeToken(refreshToken: string) {
    await prisma.token.delete({ where: { refreshToken } });
  }

  static validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static async findToken(refreshToken: string) {
    const tokenData = await prisma.token.findUnique({ where: { refreshToken } });
    return tokenData;
  }
}

export default TokenService;
