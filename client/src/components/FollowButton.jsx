import { useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function FollowButton({ targetUser, onUpdate }) {
    const { user } = useContext(AuthContext);
    
    // Check if the current logged-in user is following the target user
    const [isFollowing, setIsFollowing] = useState(
        targetUser.followers?.includes(user._id)
    );
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(false);

    if (user._id === targetUser._id) {
        return null;
    }

    const handleFollow = async (e) => {
        e.preventDefault(); // Prevent navigating if wrapped in a link
        if (loading) return;
        setLoading(true);
        try {
            await api.put(`/users/${targetUser._id}/follow`);
            setIsFollowing(!isFollowing);
            if (onUpdate) onUpdate();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Action failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleFollow}
            disabled={loading}
            className={`px-4 py-1.5 rounded-full font-bold text-sm border transition-colors ${
                isFollowing
                    ? isHovered
                        ? 'bg-[var(--color-error)]/10 text-[var(--color-error)] border-[var(--color-error)]'
                        : 'bg-transparent text-white border-[var(--color-border-color)]'
                    : 'bg-white text-black border-white hover:bg-gray-200'
            }`}
        >
            {isFollowing ? (isHovered ? 'Unfollow' : 'Following') : 'Follow'}
        </button>
    );
}
