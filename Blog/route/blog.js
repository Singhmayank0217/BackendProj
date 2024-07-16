// const express = require("express");
// const router = express.Router();

// //import controller
// // const { dummyLink } = require("../controller/likecontroller");
// const { createComment } = require("../controller/commentcontroller");



// //mapping create
// // router.get("/dummyroute", dummyLink);
// router.post("/comment/create", createComment)

// //export
// module.exports = router;



const express = require("express");
const router = express.Router();
const { createComment } = require("../controller/commentcontroller");
const { likePost, unlikePost } = require("../controller/likecontroller");
const { createPost,getALLPosts } = require("../controller/postcontroller");


router.post("/comments/create", createComment);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);
router.post("/posts/create", createPost );
router.get("/posts", getALLPosts );

module.exports = router;
