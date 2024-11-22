import express from "express";
import { createPost, getAllPosts, getMyPosts, getPostById } from "../controllers/postController.js";
import { isAuthenticated } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.post("/create", isAuthenticated, createPost);
postRouter.get("/all", isAuthenticated, getAllPosts);
postRouter.get("/:id", isAuthenticated, getPostById);
postRouter.get("/my", isAuthenticated, getMyPosts);


export default postRouter;
