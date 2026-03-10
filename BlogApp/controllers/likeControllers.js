const Post = require("../models/postModels");
const Like = require("../models/likeModels");
const { response } = require("express");

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body
        const like = new Like({
            post,
            user
        })
        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { likes: savedLike._id } },
            { new: true }
        )
            .populate("likes")
            .exec();

        res.json({
            post: updatedPost
        })
    } catch (err) {
        return res.status(500).json({
            error: "Error While Like Post",
        });
    }
}

exports.unlikePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        // Find and delete like using post + user
        const deletedLike = await Like.findOneAndDelete({ 
            post: post, 
            user: user 
        });

        if (!deletedLike) {
            return res.status(404).json({
                error: "Like not found",
            });
        }

        // Remove like reference from Post
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $pull: { likes: deletedLike._id } },
            { new: true }
        ).populate("likes").exec();

        res.json({
            post: updatedPost,
        });

    } catch (err) {
        return res.status(500).json({
            error: "Error While unLike Post",
        });
    }
};