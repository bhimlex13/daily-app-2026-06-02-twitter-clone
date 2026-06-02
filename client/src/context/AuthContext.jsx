import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const savedUser = localStorage.getItem('echo_user');
            if (savedUser) {
                try {
                    // Verify token is still valid
                    const { data } = await api.get('/auth/me');
                    // data doesn't include token, so we merge it back
                    const parsedUser = JSON.parse(savedUser);
                    setUser({ ...data, token: parsedUser.token });
                } catch (error) {
                    console.error('Token expired or invalid', error);
                    localStorage.removeItem('echo_user');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        localStorage.setItem('echo_user', JSON.stringify(data));
        setUser(data);
    };

    const register = async (userData) => {
        const { data } = await api.post('/auth/register', userData);
        localStorage.setItem('echo_user', JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem('echo_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
