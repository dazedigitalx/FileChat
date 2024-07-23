// src/contexts/GuestUserContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateAnonymousId } from '../utils'; // Import the correct function

const GuestUserContext = createContext();

export const GuestUserProvider = ({ children }) => {
    const [guestId, setGuestId] = useState(null);

    useEffect(() => {
        let storedGuestId = localStorage.getItem('guestId');

        if (!storedGuestId) {
            storedGuestId = generateAnonymousId(); // Use the correct function to generate guest ID
            localStorage.setItem('guestId', storedGuestId);
        }

        setGuestId(storedGuestId);
    }, []);

    return (
        <GuestUserContext.Provider value={{ guestId }}>
            {children}
        </GuestUserContext.Provider>
    );
};

export const useGuestUser = () => useContext(GuestUserContext);
