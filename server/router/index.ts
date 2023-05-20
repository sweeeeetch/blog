import { Router } from "express";
import UserController from "../controllers/user-controller.js";
import PostController from "../controllers/post-controller.js";
import { body } from "express-validator";
import authMw from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/user/register",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  body("username").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post("/user/login", UserController.login);
router.post("/user/logout", UserController.logout);
router.get("/user/refresh", UserController.refresh);

router.get("/posts/myposts", authMw, PostController.getMyPosts);
router.post("/posts/create", authMw, PostController.createPost);
router.put("/posts/edit/:id", authMw, PostController.editPost);
router.put("/posts/delete/:id", authMw, PostController.deletePost);
router.get("/posts/get/", PostController.getPosts);
router.get("/posts/get/:id", PostController.getPost);

export default router;
