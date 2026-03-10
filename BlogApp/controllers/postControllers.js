const Post = require("../models/postModels");

exports.createPost = async(req, res) => {
    try {
        const {title, body} = req.body;
        const post = new Post({title, body});
        const savedPost = await post.save();

        res.json({
            post: savedPost
        })
        
    } catch (err) {
        return res.status(400).json({
            error: " Error while creating post"
        })
    }
}

exports.getAllPosts = async(req, res) => {
    try {
        const post = await Post.find().populate("likes").populate("comments").exec();
        res
        .json({
            success: true,
            data : post,
            message: "All post get"
        })

    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: "internal server error",
                message: "server error",
            })
    }
}

