import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: false,
        },

        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vJkbAWVHg_H9haoeG7xjnne2yUKEJBDOcQ&s"
        },
        category: {
            type: String,
            default: 'Uncategorized'
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

    }, { timestamps: true }
)

const Post = mongoose.model('Post', postSchema);

export default Post;