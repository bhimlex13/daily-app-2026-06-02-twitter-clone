import { useState, useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import PostFeed from '../components/PostFeed';
import api from '../api/axios';

export default function Home() {
    const [activeTab, setActiveTab] = useState('for-you');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeed(activeTab);
    }, [activeTab]);

    const fetchFeed = async (type) => {
        setLoading(true);
        try {
            const { data } = await api.get(`/posts?type=${type}`);
            setPosts(data);
        } catch (error) {
            console.error('Failed to fetch feed');
        } finally {
            setLoading(false);
        }
    };

    const handlePostCreated = (newPost) => {
        if (activeTab === 'for-you') {
            setPosts([newPost, ...posts]);
        }
    };

    const handleDeletePost = (postId) => {
        setPosts(posts.filter(p => p._id !== postId));
    };

    return (
        <div className="w-full">
            {/* Header/Tabs */}
            <div className="sticky top-0 z-10 glass-panel border-x-0 border-t-0">
                <h1 className="font-bold text-xl p-4 cursor-pointer">Home</h1>
                <div className="flex w-full">
                    <button 
                        onClick={() => setActiveTab('for-you')}
                        className="flex-1 hover:bg-[var(--color-bg-tertiary)] transition-colors py-4 text-center font-bold relative"
                    >
                        <span className={activeTab === 'for-you' ? 'text-white' : 'text-[var(--color-text-secondary)]'}>For you</span>
                        {activeTab === 'for-you' && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-accent)] rounded-full"></div>
                        )}
                    </button>
                    <button 
                        onClick={() => setActiveTab('following')}
                        className="flex-1 hover:bg-[var(--color-bg-tertiary)] transition-colors py-4 text-center font-bold relative"
                    >
                        <span className={activeTab === 'following' ? 'text-white' : 'text-[var(--color-text-secondary)]'}>Following</span>
                        {activeTab === 'following' && (
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[var(--color-accent)] rounded-full"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Compose Area */}
            <CreatePost onPostCreated={handlePostCreated} />

            {/* Feed */}
            <PostFeed posts={posts} loading={loading} onDeletePost={handleDeletePost} />
        </div>
    );
}
