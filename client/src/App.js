import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnonymousUserProvider } from './contexts/AnonymousUserContext';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Guest from './components/Guest';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <AnonymousUserProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                        </Routes>
                    </div>
                </Router>
            </AnonymousUserProvider>
        </AuthProvider>
    );
};

export default App;
