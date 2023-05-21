import { prisma } from "../index.js";
import { v4 } from "uuid";
import PostService from "../service/post-service.js";
import ApiError from "../exceptions/api-error.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class PostController {
    static async getPosts(req, res, next) {
        try {
            const { page = 1, pageSize = 20 } = req.query;
            const parsedPage = parseInt(page.toString(), 10);
            const parsedPageSize = parseInt(pageSize.toString(), 10);
            const { totalPages, posts } = await PostService.recievePosts(parsedPage, parsedPageSize);
            return res.json({ totalPages, posts });
        }
        catch (e) {
            next(e);
        }
    }
    static async getMyPosts(req, res, next) {
        try {
            const user = req.user;
            const { page = 1, pageSize = 20 } = req.query;
            const parsedPage = parseInt(page.toString(), 10);
            const parsedPageSize = parseInt(pageSize.toString(), 10);
            if (!user) {
                throw ApiError.UnauthorizedError();
            }
            const { totalPages, posts } = await PostService.recieveMyPosts(parsedPage, parsedPageSize, user.username);
            return res.json({ totalPages, posts });
        }
        catch (e) {
            next(e);
        }
    }
    static async getPost(req, res, next) {
        try {
            const id = req.params.id;
            const post = await prisma.post.findUnique({ where: { id } });
            if (!post) {
                throw ApiError.BadRequest("Post not found");
            }
            return res.json(post);
        }
        catch (e) {
            next(e);
        }
    }
    static async createPost(req, res, next) {
        try {
            const { title, text, author, userId } = req.body;
            let image;
            if (req.files) {
                image = req.files?.image;
            }
            let imagePath;
            if (image) {
                const folderPath = path.resolve(__dirname, "..", "..", "static", "imgs");
                // if (!fs.existsSync(folderPath)) {
                //   fs.mkdirSync(folderPath);
                // }
                if (image.size > 5242880) {
                    throw ApiError.BadRequest("Image must be less than 5MB");
                }
                const filename = v4() + ".jpg";
                imagePath = path.resolve(folderPath, filename);
                console.log(imagePath);
                await image.mv(imagePath);
            }
            const post = await prisma.post.create({
                data: {
                    title,
                    text,
                    image: imagePath ? imagePath : undefined,
                    author,
                    userId,
                },
            });
            return res.json(post);
        }
        catch (e) {
            next(e);
        }
    }
    static async editPost(req, res, next) {
        try {
            const { title, text } = req.body;
            const { id } = req.params;
            const post = await prisma.post.findUnique({ where: { id } });
            if (!post) {
                throw ApiError.BadRequest("Post not found");
            }
            if (req.user?.username !== post.author) {
                throw ApiError.UnauthorizedError();
            }
            await prisma.post.update({
                where: { id },
                data: { title: title ? title : post.title, text: text ? text : post.text },
            });
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const post = await prisma.post.findUnique({ where: { id } });
            if (!post) {
                throw ApiError.BadRequest("Post not found");
            }
            if (req.user?.username !== post.author) {
                throw ApiError.UnauthorizedError();
            }
            await prisma.post.delete({ where: { id } });
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
}
export default PostController;