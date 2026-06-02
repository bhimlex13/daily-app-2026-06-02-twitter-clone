import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true,
        maxlength: 280
    },
    image: {
        type: String,
        default: ''
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reposts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    replyCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
export default Post;
