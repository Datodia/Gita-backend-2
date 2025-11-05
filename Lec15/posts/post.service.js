const userModel = require("../users/user.model")
const postModel = require("./post.model")


exports.getAllPosts = async (req, res) => {
    const posts = await postModel.find().populate('author', '-posts')
    res.json(posts)
}  


exports.createPost = async (req, res) => {
    const {title, content} = req.body

    const newPost = await postModel.create({
        title,
        content,
        author: req.userId
    })

    await userModel.findByIdAndUpdate(req.userId, {
        $push: {posts: newPost._id}
    })

    res.status(201).json({message: "post created successfylly"})
}