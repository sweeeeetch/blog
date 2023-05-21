import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../index.js";
dotenv.config();
class TokenService {
    static generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "6h" });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });
        return { accessToken, refreshToken };
    }
    static async saveTokens(userId, refreshToken) {
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
    static async removeToken(refreshToken) {
        await prisma.token.delete({ where: { refreshToken } });
    }
    static validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    static validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    static async findToken(refreshToken) {
        const tokenData = await prisma.token.findUnique({ where: { refreshToken } });
        return tokenData;
    }
}
export default TokenService;
