import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

// Request interceptor to attach JWT
api.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem('echo_user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
