import ApiError from "../exceptions/api-error.js";
import { prisma } from "../index.js";

class PostService {
  static async recievePosts(page: number, pageSize: number) {
    try {
      const totalPosts = await prisma.post.count();
      const totalPages = Math.ceil(totalPosts / pageSize);

      const posts = await prisma.post.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      return { totalPages, posts };
    } catch (e) {
      throw ApiError.InternalError();
    }
  }
}

export default PostService;
