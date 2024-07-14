import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Adjust the path as needed
import { AnonymousUserProvider } from './contexts/AnonymousUserContext'; // Adjust the path as needed
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Anonymous from './components/Anonymous'; // Correct path to Anonymous component

const App = () => {
    return (
        <AuthProvider>
            <AnonymousUserProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                            <Route path="/anonymous" element={<Anonymous />} />
                        </Routes>
                    </div>
                </Router>
            </AnonymousUserProvider>
        </AuthProvider>
    );
};

export default App;
