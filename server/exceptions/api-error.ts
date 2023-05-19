export default class ApiError extends Error {
  constructor(public status: number, public message: string, public errors: any[] = []) {
    super(message);
  }

  static UnauthorizedError() {
    return new ApiError(401, "User not authorized");
  }
  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }
  static InternalError() {
    return new ApiError(500, "Internal Server Error");
  }
}
