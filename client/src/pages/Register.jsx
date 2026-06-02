import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Feather } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        
        try {
            await register({
                username: formData.username,
                displayName: formData.displayName,
                email: formData.email,
                password: formData.password
            });
            toast.success('Account created successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-md glass-panel p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-accent)]/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <Feather className="w-12 h-12 text-[var(--color-accent)] mb-6" />
                    <h1 className="text-3xl font-bold mb-2">Join Echo today</h1>
                    <p className="text-[var(--color-text-secondary)] mb-8">Create your account.</p>
                    
                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="displayName"
                                placeholder="Display Name"
                                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                value={formData.displayName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-color)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-3 rounded-xl transition-colors mt-2"
                        >
                            Sign up
                        </button>
                    </form>
                    
                    <p className="mt-6 text-[var(--color-text-secondary)]">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[var(--color-accent)] hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
