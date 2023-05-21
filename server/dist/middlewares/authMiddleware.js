import ApiError from "../exceptions/api-error.js";
import TokenService from "../service/token-service.js";
export default function (req, res, next) {
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
        req.user = userData;
        next();
    }
    catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}
