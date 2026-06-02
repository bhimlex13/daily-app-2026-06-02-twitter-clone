import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Repeat2, Share, Trash2 } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

export default function PostCard({ post, onDelete }) {
    const { user } = useContext(AuthContext);
    const [likes, setLikes] = useState(post.likes || []);
    const [isLiked, setIsLiked] = useState(post.likes?.includes(user?._id));
    
    // Animation state
    const [isLiking, setIsLiking] = useState(false);

    const handleLike = async (e) => {
        e.preventDefault(); // Prevent navigating to post detail if this is a link
        
        setIsLiking(true);
        setTimeout(() => setIsLiking(false), 300); // Reset animation

        try {
            // Optimistic update
            setIsLiked(!isLiked);
            setLikes(isLiked 
                ? likes.filter(id => id !== user._id) 
                : [...likes, user._id]
            );

            await api.put(`/posts/${post._id}/like`);
        } catch (error) {
            // Revert on error
            setIsLiked(isLiked);
            setLikes(likes);
            console.error('Failed to toggle like');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if(window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${post._id}`);
                if (onDelete) onDelete(post._id);
            } catch (error) {
                console.error('Failed to delete post');
            }
        }
    };

    const isAuthor = user && post.author?._id === user._id;

    return (
        <div className="border-b border-[var(--color-border-color)] p-4 hover:bg-[var(--color-bg-secondary)]/50 transition-colors cursor-pointer group">
            <div className="flex space-x-4">
                <Link to={`/profile/${post.author?.username}`} className="flex-shrink-0 relative z-10" onClick={(e) => e.stopPropagation()}>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold text-lg hover:brightness-110 transition-all">
                        {post.author?.displayName?.charAt(0).toUpperCase() || '?'}
                    </div>
                </Link>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 truncate">
                            <Link to={`/profile/${post.author?.username}`} className="font-bold hover:underline truncate" onClick={(e) => e.stopPropagation()}>
                                {post.author?.displayName}
                            </Link>
                            <span className="text-[var(--color-text-secondary)] truncate">@{post.author?.username}</span>
                            <span className="text-[var(--color-text-secondary)]">·</span>
                            <span className="text-[var(--color-text-secondary)] hover:underline whitespace-nowrap">
                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: false })}
                            </span>
                        </div>
                        {isAuthor && (
                            <button onClick={handleDelete} className="text-[var(--color-text-secondary)] hover:text-[var(--color-error)] opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-[var(--color-error)]/10">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    
                    <p className="mt-1 text-[15px] whitespace-pre-wrap break-words">{post.content}</p>
                    
                    {/* Action Bar */}
                    <div className="flex items-center justify-between mt-3 text-[var(--color-text-secondary)] max-w-md">
                        <button className="flex items-center space-x-2 group/action hover:text-[#1d9bf0] transition-colors" title="Reply coming soon">
                            <div className="p-2 rounded-full group-hover/action:bg-[#1d9bf0]/10 transition-colors">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <span className="text-sm">{post.replyCount || 0}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 group/action hover:text-[var(--color-repost-green)] transition-colors" title="Repost coming soon">
                            <div className="p-2 rounded-full group-hover/action:bg-[var(--color-repost-green)]/10 transition-colors">
                                <Repeat2 className="w-5 h-5" />
                            </div>
                            <span className="text-sm">{post.reposts?.length || 0}</span>
                        </button>
                        
                        <button 
                            onClick={handleLike} 
                            className={`flex items-center space-x-2 group/action transition-colors ${isLiked ? 'text-[var(--color-like-red)]' : 'hover:text-[var(--color-like-red)]'}`}
                        >
                            <div className="p-2 rounded-full group-hover/action:bg-[var(--color-like-red)]/10 transition-colors">
                                <Heart className={`w-5 h-5 transition-transform ${isLiked ? 'fill-current' : ''} ${isLiking ? 'scale-125' : 'scale-100'}`} />
                            </div>
                            <span className="text-sm">{likes.length}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 group/action hover:text-[var(--color-accent)] transition-colors">
                            <div className="p-2 rounded-full group-hover/action:bg-[var(--color-accent)]/10 transition-colors">
                                <Share className="w-5 h-5" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
