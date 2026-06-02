import PostCard from './PostCard';
import { Loader2 } from 'lucide-react';

export default function PostFeed({ posts, loading, onDeletePost }) {
    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 text-[var(--color-accent)] animate-spin" />
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="p-8 text-center text-[var(--color-text-secondary)]">
                <p className="text-lg font-bold">Nothing to see here — yet.</p>
                <p className="mt-2">When people you follow post, they'll show up here.</p>
            </div>
        );
    }

    return (
        <div>
            {posts.map(post => (
                <PostCard 
                    key={post._id} 
                    post={post} 
                    onDelete={onDeletePost} 
                />
            ))}
        </div>
    );
}
