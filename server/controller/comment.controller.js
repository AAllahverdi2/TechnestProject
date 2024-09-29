const CommentModel = require("../models/comment.model")

const CommentController = {
    getAll: async (req, res) => {
        try {
            const comments = await CommentModel.find({})
            res.status(200).send(comments)

        } catch (err) {
            res.status(404).send('Error In Getting All Comments' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const comment = await CommentModel.findById(id)
            res.status(200).send(comment)

        } catch (err) {
            res.status(404).send('Error In Getting One Comment' + err)
        }
    },
    getAllBlogsComment: async (req, res) => {
        try {
            const blogId = req.params.blogId;
            const oneBlogComments = await CommentModel.find({ blogId: blogId })
            res.status(200).send(oneBlogComments)

        } catch (err) {
            res.status(404).send('Error In Getting All Blogs Comments' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteComment = await CommentModel.findByIdAndDelete(id)
            res.send(deleteComment)

        } catch (err) {
            res.status(404).send('Error In Deleting Comment' + err)
        }
    },
    add: async (req, res) => {
        try {
            const {
                blogId,
                addedComment,
                blogPosterUser,
                commentedName,
                commentedProfileImage,
                commentContent,
                posterUserGmail,

            } = req.body;

            const newComment = new CommentModel({
                blogId: blogId,
                addedComment: addedComment,
                blogPosterUser: blogPosterUser,
                commentedName: commentedName,
                commentedProfileImage: commentedProfileImage,
                commentContent: commentContent,
                posterUserGmail: posterUserGmail,
            });

            await newComment.save();
            res.status(201).send(newComment);
        } catch (err) {
            console.log(err)
            res.status(400).send('Error In Posting Comment: ' + err);
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const {
                blogId,
                addedComment,
                blogPosterUser,
                commentedName,
                commentedProfileImage,
                commentContent,
                posterUserGmail,

            } = req.body;
            const commentUpdate = {
                blogId: blogId,
                addedComment: addedComment,
                blogPosterUser: blogPosterUser,
                commentedName: commentedName,
                commentedProfileImage: commentedProfileImage,
                commentContent: commentContent,
                posterUserGmail: posterUserGmail,
            }
            await CommentModel.findByIdAndUpdate(id, {
                $set: commentUpdate
            }, { new: true })
            const updatedComment = await CommentModel.findById(id)
            res.status(200).send(updatedComment)
        } catch (err) {
            res.status(404).send('Error In Editing Comment' + err)
        }
    },
}


module.exports = CommentController