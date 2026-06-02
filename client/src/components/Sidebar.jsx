import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Feather, Home, User as UserIcon, Bell, Search, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Sidebar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Explore', path: '/explore' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: UserIcon, label: 'Profile', path: `/profile/${user?.username}` },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="hidden sm:flex flex-col w-20 xl:w-64 fixed h-screen left-0 xl:left-auto p-4 z-20">
            <div className="flex items-center justify-center xl:justify-start xl:px-4 mb-6">
                <Feather className="w-10 h-10 text-[var(--color-accent)]" />
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center justify-center xl:justify-start space-x-4 p-4 xl:px-4 rounded-full transition-colors ${
                                isActive
                                    ? 'bg-[var(--color-bg-tertiary)] font-bold'
                                    : 'hover:bg-[var(--color-bg-tertiary)]'
                            }`
                        }
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="hidden xl:inline text-xl">{item.label}</span>
                    </NavLink>
                ))}
                <button className="w-full mt-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-bold py-4 rounded-full transition-colors hidden xl:block shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    Echo
                </button>
                <button className="w-12 h-12 mx-auto mt-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-full flex items-center justify-center xl:hidden shadow-lg shadow-indigo-500/20">
                    <Feather className="w-6 h-6" />
                </button>
            </nav>

            {user && (
                <div className="mt-auto flex items-center justify-center xl:justify-between p-2 xl:p-4 rounded-full hover:bg-[var(--color-bg-tertiary)] cursor-pointer transition-colors glass-panel" onClick={handleLogout}>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {user.displayName?.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden xl:block">
                            <p className="font-bold text-sm">{user.displayName}</p>
                            <p className="text-[var(--color-text-secondary)] text-sm">@{user.username}</p>
                        </div>
                    </div>
                    <LogOut className="hidden xl:block w-5 h-5 text-[var(--color-text-secondary)] hover:text-[var(--color-error)]" />
                </div>
            )}
        </div>
    );
}
