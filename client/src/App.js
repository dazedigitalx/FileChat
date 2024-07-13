import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Adjust path as needed
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Anonymous from './components/DashboardAnon'; // Assuming you have this component

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Navigate to="/anonymous" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/anonymous" element={<Anonymous />} />
                        {/* Optionally, add a catch-all route for unknown paths */}
                        <Route path="*" element={<Navigate to="/anonymous" />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
