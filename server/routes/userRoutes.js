import express from 'express';
import {
    getProfile,
    getUserPosts,
    toggleFollow,
    getSuggestedUsers
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/suggested', protect, getSuggestedUsers);
router.get('/:username', protect, getProfile);
router.get('/:username/posts', protect, getUserPosts);
router.put('/:id/follow', protect, toggleFollow);

export default router;
