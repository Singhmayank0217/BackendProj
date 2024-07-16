// //import model 
// const Post = require("../model/post");
// const Comment = require("../model/comment");

// //business logic
// exports.createcomment = async (req, res) => {
//     try { 
//         //fetch data from req body
//         const { post, user, body } = req.body;

//         //create a comment object
//         const comment = new Comment({
//             post, user, body
//         });

//         //save the new comment into the database
//         const savedComment = await comment.save();

//         //find the post using id and add the new comment to its comment array
//         const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comment: savedComment._id } }, { new: true }).populate("comment").exec();

//         res.json({
//             post:updatedPost,
//         });

//     }
//     catch (error) {
//         return res.status(500).json({
//             error:"Error while creating comment"
//         });
//     }
// };



const Post = require("../model/post");
const Comment = require("../model/comment");

exports.createComment = async (req, res) => {
    try { 
        const { post, user, body } = req.body;
        const comment = new Comment({ post, user, body });
        const savedComment = await comment.save();
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true }).populate("comments").exec();

        res.json({ post: updatedPost });
    } catch (error) {
        return res.status(500).json({ error: "Error while creating comment" });
    }
};