// src/contexts/AnonymousUserContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateAnonymousId } from '../utils';


const AnonymousUserContext = createContext();

export const AnonymousUserProvider = ({ children }) => {
    const [anonymousId, setAnonymousId] = useState(null);

    useEffect(() => {
        let storedAnonymousId = localStorage.getItem('anonymousId');

        if (!storedAnonymousId) {
            storedAnonymousId = generateAnonymousId();
            localStorage.setItem('anonymousId', storedAnonymousId);
        }

        setAnonymousId(storedAnonymousId);
    }, []);

    return (
        <AnonymousUserContext.Provider value={{ anonymousId }}>
            {children}
        </AnonymousUserContext.Provider>
    );
};

export const useAnonymousUser = () => useContext(AnonymousUserContext);
