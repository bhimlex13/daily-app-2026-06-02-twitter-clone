import Post from '../models/Post.js';

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { content, replyTo } = req.body;

        if (!content || content.length > 280) {
            return res.status(400).json({ message: 'Content is required and must be under 280 characters' });
        }

        const post = new Post({
            author: req.user._id,
            content,
            replyTo: replyTo || null
        });

        const createdPost = await post.save();

        if (replyTo) {
            await Post.findByIdAndUpdate(replyTo, { $inc: { replyCount: 1 } });
        }

        const populatedPost = await Post.findById(createdPost._id).populate('author', 'username displayName avatar');
        res.status(201).json(populatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get feed (for you / following)
// @route   GET /api/posts
// @access  Private
export const getFeed = async (req, res) => {
    try {
        const { type = 'for-you', page = 1, limit = 20 } = req.query;
        let query = { replyTo: null }; // Main feed only shows top-level posts

        if (type === 'following') {
            query.author = { $in: req.user.following };
        }

        const posts = await Post.find(query)
            .populate('author', 'username displayName avatar')
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Private
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username displayName avatar');
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await post.deleteOne();
        res.json({ message: 'Post removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle like
// @route   PUT /api/posts/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isLiked = post.likes.includes(req.user._id);

        if (isLiked) {
            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            post.likes.push(req.user._id);
        }

        await post.save();
        res.json(post.likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get replies to a post
// @route   GET /api/posts/:id/replies
// @access  Private
export const getReplies = async (req, res) => {
    try {
        const replies = await Post.find({ replyTo: req.params.id })
            .populate('author', 'username displayName avatar')
            .sort({ createdAt: -1 });
        
        res.json(replies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
