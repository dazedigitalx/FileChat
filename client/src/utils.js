// src/utils.js

// Utility function to generate a unique identifier
export const generateAnonymousId = () => `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
