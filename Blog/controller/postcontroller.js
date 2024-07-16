// const Post = require("../model/post");

// exports.createPost = async (req, res) => {
//     try {
//         const { title, body } = req.body;
//         const post = new Post({ title, body });
//         const savedPost = await post.save();

//         res.json({ post: savedPost });
//     } catch (error) {
//         return res.status(400).json({ error: "Error while creating post", });
//     }
// };

// exports.getALLPosts = async(req,res)=>{
//     try{
//         const posts = await Post.find().populate("likes").populate("comments").exec();
//         res.json({
//             posts,
//         }) 
//     }catch (error) {
//         return res.status(400).json({ error: "Error while fetching post", });
//     }
// };


const Post = require("../model/post");

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({ title, body });
        const savedPost = await post.save();

        res.json({ post: savedPost });
    } catch (error) {
        return res.status(400).json({ error: "Error while creating post" });
    }
};

exports.getAllPosts = async (req, res) => { // Changed function name to follow camelCase convention
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.json({ posts }); // Updated response object to match the correct JSON structure
    } catch (error) {
        return res.status(400).json({ error: "Error while fetching posts" }); // Updated error message for consistency
    }
};
