const BlogModel = require("../models/blog.model")
const CommentModel = require("../models/comment.model")

const BlogController = {
    getAll: async (req, res) => {
        try {
            const blogs = await BlogModel.find({})
            res.status(200).send(blogs)

        } catch (err) {
            res.status(404).send('Error In Getting All Blogs' + err)
        }
    },
    getOne: async (req, res) => {
        try {
            const { id } = req.params
            const blog = await BlogModel.findById(id)
            res.status(200).send(blog)

        } catch (err) {
            res.status(404).send('Error In Getting One Blog' + err)
        }
    },
    getAllUsersData: async (req, res) => {
        try {
            const posterId = req.params.posterId;
            const blogs = await BlogModel.find({ posterId: posterId })
            res.status(200).send(blogs)

        } catch (err) {
            res.status(404).send('Error In Getting All Users Blogs' + err)
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const deleteBlog = await BlogModel.findByIdAndDelete(id)
            await CommentModel.deleteMany({ blogId: deleteBlog._id })
            res.send(deleteBlog)

        } catch (err) {
            res.status(404).send('Error In Deleting Blog' + err)
        }
    },

    add: async (req, res) => {
        try {
            const {
                posterId,
                blogTitle,
                blogSmallContent,
                blogContent,
                posterImage,
                posterName,
                blogTitle2,
                watchers,

            } = req.body

            const divideBlogContent = blogContent.split("\n")



            const newBlog = new BlogModel({
                posterId: posterId,
                blogTitle: blogTitle,
                blogSmallContent: blogSmallContent,
                posterImage: posterImage,
                posterName: posterName,
                watchers: watchers,
                blogTitle2: blogTitle2,
                blogImage: req.file.filename,
                blogContent: [],
            })

            if (blogContent) {
                for (let string of divideBlogContent) {
                    const trimmedString = string.trim();
                    if (trimmedString !== '') {
                        newBlog.blogContent.push(trimmedString);
                    }
                }
            }

            await newBlog.save()
            res.status(200).send(newBlog)
        } catch (err) {
            console.log(err)
            res.status(404).send('Error In Posting Blog' + err)
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params
            const {
                posterId,
                blogTitle,
                blogSmallContent,
                blogContent,
                posterImage,
                posterName,
                watchers,
                blogTitle2,

            } = req.body
            const divideBlogContent = blogContent.split("\n")

            const updateData = {
                posterId: posterId,
                blogTitle: blogTitle,
                blogSmallContent: blogSmallContent,
                blogContent: [],
                posterImage: posterImage,
                posterName: posterName,
                watchers: watchers,
                blogTitle2: blogTitle2
            };
            for (let string of divideBlogContent) {
                const trimmedString = string.trim();
                if (trimmedString !== '') {
                    updateData.blogContent.push(trimmedString);
                }
            }
            if (req.file) {
                updateData.blogImage = req.file.filename;
            }
            await BlogModel.findByIdAndUpdate(id, { $set: updateData }, { new: true })
            const updatedBlog = await BlogModel.findById(id)
            res.status(200).send(updatedBlog)
        } catch (err) {
            res.status(404).send('Error In Editing Blog' + err)
        }
    },
    incrementWatch: async (req, res) => {
        try {
            const blogId = req.params.id;

            const blog = await BlogModel.findById(blogId);
            if (!blog) {
                return res.status(404).send('Blog not found');
            }

            blog.watchers += 1;

            await BlogModel.findByIdAndUpdate(blogId, {
                $set: {
                    watchers: blog.watchers
                }
            }, { new: true })

            const blog2 = await BlogModel.findById(blogId);

            res.status(200).send(blog2);
        } catch (err) {
            console.log(err);
            res.status(500).send('Error incrementing watch count');
        }
    },
}


module.exports = BlogController