import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import FollowButton from './FollowButton';

export default function RightPanel() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        const fetchSuggested = async () => {
            try {
                const { data } = await api.get('/users/suggested');
                setSuggestedUsers(data);
            } catch (error) {
                console.error('Failed to fetch suggested users');
            }
        };
        fetchSuggested();
    }, []);

    return (
        <div className="hidden lg:block w-80 p-4 space-y-6">
            {/* Search */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-text-secondary)] group-focus-within:text-[var(--color-accent)]">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-[var(--color-bg-tertiary)] border border-transparent rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-accent)] focus:bg-[var(--color-bg-primary)] transition-colors"
                />
            </div>

            {/* Trending */}
            <div className="glass-panel rounded-2xl p-4">
                <h2 className="font-bold text-xl mb-4">What's happening</h2>
                <div className="space-y-4">
                    <div className="cursor-pointer hover:bg-[var(--color-bg-tertiary)] p-2 -mx-2 rounded transition-colors">
                        <p className="text-xs text-[var(--color-text-secondary)]">Trending in Tech</p>
                        <p className="font-bold mt-0.5">#React19</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">14.5k Echoes</p>
                    </div>
                    <div className="cursor-pointer hover:bg-[var(--color-bg-tertiary)] p-2 -mx-2 rounded transition-colors">
                        <p className="text-xs text-[var(--color-text-secondary)]">Trending</p>
                        <p className="font-bold mt-0.5">Dark Mode Everywhere</p>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">28.2k Echoes</p>
                    </div>
                </div>
            </div>

            {/* Who to follow */}
            <div className="glass-panel rounded-2xl p-4">
                <h2 className="font-bold text-xl mb-4">Who to follow</h2>
                <div className="space-y-4">
                    {suggestedUsers.map(user => (
                        <div key={user._id} className="flex items-center justify-between">
                            <Link to={`/profile/${user.username}`} className="flex items-center space-x-3 overflow-hidden">
                                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                                    {user.displayName.charAt(0).toUpperCase()}
                                </div>
                                <div className="truncate">
                                    <p className="font-bold text-sm truncate hover:underline">{user.displayName}</p>
                                    <p className="text-[var(--color-text-secondary)] text-sm truncate">@{user.username}</p>
                                </div>
                            </Link>
                            <FollowButton targetUser={user} />
                        </div>
                    ))}
                    {suggestedUsers.length === 0 && (
                        <p className="text-[var(--color-text-secondary)] text-sm">No suggestions right now.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
