import { NextFunction, Request, Response } from "express";
import { prisma } from "../index.js";
import { v4 } from "uuid";
import PostService from "../service/post-service.js";
import ApiError from "../exceptions/api-error.js";
import path from "path";
import { UploadedFile } from "express-fileupload";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PostController {
  static async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, pageSize = 20 } = req.query;
      const parsedPage = parseInt(page.toString(), 10);
      const parsedPageSize = parseInt(pageSize.toString(), 10);

      const { totalPages, posts } = await PostService.recievePosts(parsedPage, parsedPageSize);

      return res.json({ totalPages, posts });
    } catch (e) {
      next(e);
    }
  }

  static async getMyPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const { page = 1, pageSize = 20 } = req.query;
      const parsedPage = parseInt(page.toString(), 10);
      const parsedPageSize = parseInt(pageSize.toString(), 10);
      if (!user) {
        throw ApiError.UnauthorizedError();
      }

      const { totalPages, posts } = await PostService.recieveMyPosts(
        parsedPage,
        parsedPageSize,
        user.username
      );

      return res.json({ totalPages, posts });
    } catch (e) {
      next(e);
    }
  }

  static async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;

      const post = await prisma.post.findUnique({ where: { id } });
      if (!post) {
        throw ApiError.BadRequest("Post not found");
      }

      return res.json(post);
    } catch (e) {
      next(e);
    }
  }

  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, text, author, userId } = req.body;
      let image: UploadedFile | undefined;
      if (req.files) {
        image = req.files?.image as UploadedFile;
      }
      let imagePath: string | undefined;
      if (image) {
        const folderPath = path.join(__dirname, "..", "static");
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        if (image.size > 5242880) {
          throw ApiError.BadRequest("Image must be less than 5MB");
        }
        const filename = `${Date.now()}.jpg`;
        imagePath = path.resolve(folderPath, filename);
        console.log(imagePath);
        await image.mv(imagePath);
        fs.readdir(folderPath, (err, files) => {
          if (err) {
            console.error("Error reading directory:", err);
            return;
          }

          files.forEach(file => {
            console.log(file);
          });
        });
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
    } catch (e) {
      next(e);
    }
  }

  static async editPost(req: Request, res: Response, next: NextFunction) {
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
    } catch (e) {
      next(e);
    }
  }
  static async deletePost(req: Request, res: Response, next: NextFunction) {
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
    } catch (e) {
      next(e);
    }
  }
}

export default PostController;
