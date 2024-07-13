import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Generate unique IDs

const AnonymousUserContext = createContext();

export const AnonymousUserProvider = ({ children }) => {
    const [anonymousId, setAnonymousId] = useState(null);

    useEffect(() => {
        // Check if there's an existing anonymous ID
        let id = localStorage.getItem('anonymousId');
        if (!id) {
            id = uuidv4();
            localStorage.setItem('anonymousId', id);
        }
        setAnonymousId(id);
    }, []);

    return (
        <AnonymousUserContext.Provider value={{ anonymousId }}>
            {children}
        </AnonymousUserContext.Provider>
    );
};

export const useAnonymousUser = () => useContext(AnonymousUserContext);
