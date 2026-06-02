import User from '../models/User.js';
import Post from '../models/Post.js';

// @desc    Get user profile by username
// @route   GET /api/users/:username
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select('-password');
            
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user's posts
// @route   GET /api/users/:username/posts
// @access  Private
export const getUserPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const posts = await Post.find({ author: user._id, replyTo: null })
            .populate('author', 'username displayName avatar')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle follow user
// @route   PUT /api/users/:id/follow
// @access  Private
export const toggleFollow = async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!targetUser || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isFollowing = currentUser.following.includes(targetUser._id);

        if (isFollowing) {
            // Unfollow
            currentUser.following = currentUser.following.filter(id => id.toString() !== targetUser._id.toString());
            targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUser._id.toString());
        } else {
            // Follow
            currentUser.following.push(targetUser._id);
            targetUser.followers.push(currentUser._id);
        }

        await currentUser.save();
        await targetUser.save();

        res.json({ following: currentUser.following });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get suggested users
// @route   GET /api/users/suggested
// @access  Private
export const getSuggestedUsers = async (req, res) => {
    try {
        // Find users not in current user's following list and not themselves
        const suggested = await User.find({
            _id: { 
                $nin: [...req.user.following, req.user._id] 
            }
        })
        .select('username displayName avatar')
        .limit(3);

        res.json(suggested);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
