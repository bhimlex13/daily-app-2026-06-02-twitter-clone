import { useState, useContext, useRef } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { ImageIcon, Smile } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreatePost({ onPostCreated }) {
    const { user } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    
    // We auto-resize the textarea
    const textareaRef = useRef(null);
    const handleInput = (e) => {
        setContent(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const isOverLimit = content.length > 280;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() || isOverLimit || loading) return;
        
        setLoading(true);
        try {
            const { data } = await api.post('/posts', { content });
            setContent('');
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
            if (onPostCreated) onPostCreated(data);
            toast.success('Echo sent!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border-b border-[var(--color-border-color)] flex space-x-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                {user?.displayName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
                <textarea
                    ref={textareaRef}
                    placeholder="What's happening?"
                    className="w-full bg-transparent text-xl focus:outline-none resize-none overflow-hidden min-h-[52px] placeholder-[var(--color-text-secondary)] mt-2"
                    value={content}
                    onChange={handleInput}
                    maxLength={300} // allow a bit over for the red UI to show
                />
                
                {/* Image preview could go here */}

                <div className="flex items-center justify-between border-t border-[var(--color-border-color)] pt-3 mt-2">
                    <div className="flex items-center space-x-2 text-[var(--color-accent)]">
                        <button className="p-2 hover:bg-[var(--color-accent)]/10 rounded-full transition-colors cursor-not-allowed opacity-50" title="Image uploads coming soon">
                            <ImageIcon className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-[var(--color-accent)]/10 rounded-full transition-colors cursor-not-allowed opacity-50" title="Emojis coming soon">
                            <Smile className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {content.length > 0 && (
                            <div className="flex items-center space-x-2">
                                <span className={`text-sm ${isOverLimit ? 'text-[var(--color-error)]' : 'text-[var(--color-text-secondary)]'}`}>
                                    {content.length}/280
                                </span>
                            </div>
                        )}
                        <button
                            onClick={handleSubmit}
                            disabled={!content.trim() || isOverLimit || loading}
                            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-1.5 px-5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Echo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
