// src/contexts/GuestUserContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateGuestID } from '../utils'; // Ensure the function is named correctly

const GuestUserContext = createContext();

export const GuestUserProvider = ({ children }) => {
    const [guestId, setGuestId] = useState(null);

    useEffect(() => {
        // Retrieve guest ID from localStorage
        let storedGuestId = localStorage.getItem('guestId');

        // Generate a new guest ID if it doesn't exist
        if (!storedGuestId) {
            storedGuestId = generateGuestID(); // Use the correct function to generate guest ID
            localStorage.setItem('guestId', storedGuestId);
        }

        // Set the guest ID state
        setGuestId(storedGuestId);
    }, []);

    return (
        <GuestUserContext.Provider value={{ guestId }}>
            {children}
        </GuestUserContext.Provider>
    );
};

// Custom hook for easy access to guest user context
export const useGuestUser = () => useContext(GuestUserContext);
