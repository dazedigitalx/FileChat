import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GuestUserProvider } from './contexts/GuestUserContext';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Guest from './components/Guest';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
    return (
        <AuthProvider>
            <GuestUserProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Guest />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                        </Routes>
                    </div>
                </Router>
            </GuestUserProvider>
        </AuthProvider>
    );
};

export default App;
