import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Feather } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Welcome back!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md glass-panel p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-accent)]/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <Feather className="w-12 h-12 text-[var(--color-accent)] mb-6" />
                    <h1 className="text-3xl font-bold mb-2">Welcome to Echo</h1>
                    <p className="text-[var(--color-text-secondary)] mb-8">Sign in to see what's happening.</p>
                    
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3 rounded-xl transition-colors"
                        >
                            Log in
                        </button>
                    </form>
                    
                    <p className="mt-6 text-[var(--color-text-secondary)]">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[var(--color-accent)] hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
