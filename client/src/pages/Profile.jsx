import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import PostFeed from '../components/PostFeed';
import FollowButton from '../components/FollowButton';
import { format } from 'date-fns';

export default function Profile() {
    const { username } = useParams();
    const navigate = useNavigate();
    const { user: currentUser } = useContext(AuthContext);
    
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            try {
                // Fetch profile details
                const profileRes = await api.get(`/users/${username}`);
                setProfile(profileRes.data);

                // Fetch their posts
                const postsRes = await api.get(`/users/${username}/posts`);
                setPosts(postsRes.data);
            } catch (error) {
                console.error('Failed to fetch profile', error);
                if (error.response?.status === 404) {
                    navigate('/'); // or a 404 page
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [username, navigate]);

    const handleDeletePost = (postId) => {
        setPosts(posts.filter(p => p._id !== postId));
    };

    if (loading) {
        return <div className="p-8 text-center">Loading profile...</div>;
    }

    if (!profile) return null;

    const isOwnProfile = currentUser?._id === profile._id;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="sticky top-0 z-10 glass-panel border-x-0 border-t-0 flex items-center px-4 py-2 space-x-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="font-bold text-xl">{profile.displayName}</h1>
                    <p className="text-sm text-[var(--color-text-secondary)]">{posts.length} Echoes</p>
                </div>
            </div>

            {/* Cover & Avatar */}
            <div className="h-48 bg-gradient-to-r from-[var(--color-accent)] to-purple-600 w-full relative">
                {/* Avatar */}
                <div className="absolute -bottom-16 left-4 rounded-full border-4 border-[var(--color-bg-primary)] w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white z-10">
                    {profile.displayName.charAt(0).toUpperCase()}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end p-4 h-20">
                {!isOwnProfile ? (
                    <div className="mt-2">
                        <FollowButton targetUser={profile} />
                    </div>
                ) : (
                    <button className="px-4 py-1.5 mt-2 rounded-full font-bold text-sm border border-[var(--color-border-color)] hover:bg-[var(--color-bg-tertiary)] transition-colors">
                        Edit profile
                    </button>
                )}
            </div>

            {/* Profile Info */}
            <div className="px-4 pb-4 border-b border-[var(--color-border-color)]">
                <h1 className="font-bold text-xl">{profile.displayName}</h1>
                <p className="text-[var(--color-text-secondary)]">@{profile.username}</p>
                
                {profile.bio && (
                    <p className="mt-3">{profile.bio}</p>
                )}

                <div className="flex items-center space-x-2 mt-3 text-[var(--color-text-secondary)] text-sm">
                    <CalendarDays className="w-4 h-4" />
                    <span>Joined {format(new Date(profile.createdAt), 'MMMM yyyy')}</span>
                </div>

                <div className="flex space-x-4 mt-3">
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold text-white">{profile.following?.length || 0}</span>
                        <span className="text-[var(--color-text-secondary)] ml-1">Following</span>
                    </div>
                    <div className="hover:underline cursor-pointer">
                        <span className="font-bold text-white">{profile.followers?.length || 0}</span>
                        <span className="text-[var(--color-text-secondary)] ml-1">Followers</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex w-full border-b border-[var(--color-border-color)]">
                <button className="flex-1 hover:bg-[var(--color-bg-tertiary)] transition-colors py-4 text-center font-bold relative">
                    <span className="text-white">Echoes</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-accent)] rounded-full"></div>
                </button>
                <button className="flex-1 hover:bg-[var(--color-bg-tertiary)] transition-colors py-4 text-center font-bold text-[var(--color-text-secondary)]">
                    Replies
                </button>
                <button className="flex-1 hover:bg-[var(--color-bg-tertiary)] transition-colors py-4 text-center font-bold text-[var(--color-text-secondary)]">
                    Likes
                </button>
            </div>

            {/* Feed */}
            <PostFeed posts={posts} loading={false} onDeletePost={handleDeletePost} />
        </div>
    );
}
