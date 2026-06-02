import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
// import Home from './pages/Home';
// import Profile from './pages/Profile';
// import Layout from './components/Layout';

// Placeholder components until we build Phase 4
const Home = () => <div className="p-8 text-white">Home Page placeholder</div>;
const Profile = () => <div className="p-8 text-white">Profile Page placeholder</div>;
const Layout = ({ children }) => <div className="flex bg-[var(--color-bg-primary)] min-h-screen text-white">{children}</div>;

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    
    if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    return <Layout>{children}</Layout>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" toastOptions={{
            style: { background: '#111118', color: '#fff', border: '1px solid #2a2a3a' }
        }} />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
            } />
            <Route path="/profile/:username" element={
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
