const express = require('express');
const router = express.Router();

// Import Controller 
const {createComment} = require("../controllers/commentControllers");
const {createPost,getAllPosts} = require("../controllers/postControllers");
const {likePost,unlikePost} = require("../controllers/likeControllers");

// Mapping Create
router.post("/comments/create",createComment)
router.post("/posts/create",createPost)
router.get("/posts",getAllPosts)
router.post("/likes/like",likePost)
router.post("/likes/unlike",unlikePost)

// Export Controller
module.exports = router;