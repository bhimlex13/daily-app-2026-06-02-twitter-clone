import express from 'express';
import {
    createPost,
    getFeed,
    getPost,
    deletePost,
    toggleLike,
    getReplies
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createPost)
    .get(protect, getFeed);

router.route('/:id')
    .get(protect, getPost)
    .delete(protect, deletePost);

router.put('/:id/like', protect, toggleLike);
router.get('/:id/replies', protect, getReplies);

export default router;
