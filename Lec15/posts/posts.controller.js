const { Router } = require("express");
const PostService = require('./post.service');
const isAuthMiddleware = require("../middlewares/isAuth.middleware");

const postRouter = Router()

postRouter.get('/', PostService.getAllPosts)
postRouter.post('/', isAuthMiddleware, PostService.createPost)

module.exports = postRouter