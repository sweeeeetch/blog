import { prisma } from "../index.js";
import bcrypt from "bcrypt";
import TokenService from "./token-service.js";
import ApiError from "../exceptions/api-error.js";
import { JwtPayload } from "jsonwebtoken";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    username: string;
    id: string;
  };
}

class UserService {
  static async register(email: string, username: string, password: string): Promise<AuthResponse> {
    const candidate = await prisma.user.findUnique({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await prisma.user.create({ data: { email, username, password: hashedPassword } });

    const tokens = TokenService.generateTokens({ email, username, id: user.id });
    await TokenService.saveTokens(user.id, tokens.refreshToken);

    return { ...tokens, user: { email, username, id: user.id } };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("User with this email doesn't exist");
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const tokens = TokenService.generateTokens({ email, username: user.username, id: user.id });
    await TokenService.saveTokens(user.id, tokens.refreshToken);

    return { ...tokens, user: { email, username: user.username, id: user.id } };
  }

  static async logout(refreshToken: string): Promise<void> {
    try {
      await TokenService.removeToken(refreshToken);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  static async refresh(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenService.validateRefreshToken(refreshToken) as JwtPayload;
    const tokenFromDB = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await prisma.user.findUnique({ where: { id: userData.id } });
    if (!user) {
      throw ApiError.InternalError();
    }

    const tokens = TokenService.generateTokens({
      email: user.email,
      username: user.username,
      id: user.id,
    });
    await TokenService.saveTokens(user.id, tokens.refreshToken);

    return { ...tokens, user: { email: user.email, username: user.username, id: user.id } };
  }
}

export default UserService;
