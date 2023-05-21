import ApiError from "../exceptions/api-error.js";
import { prisma } from "../index.js";
class PostService {
    static async recievePosts(page, pageSize) {
        try {
            const totalPosts = await prisma.post.count();
            const totalPages = Math.ceil(totalPosts / pageSize);
            const posts = await prisma.post.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            return { totalPages, posts };
        }
        catch (e) {
            throw ApiError.InternalError();
        }
    }
    static async recieveMyPosts(page, pageSize, author) {
        try {
            const totalPosts = await prisma.post.count();
            const totalPages = Math.ceil(totalPosts / pageSize);
            const posts = await prisma.post.findMany({
                where: { author },
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            return { totalPages, posts };
        }
        catch (e) {
            throw ApiError.InternalError();
        }
    }
}
export default PostService;
