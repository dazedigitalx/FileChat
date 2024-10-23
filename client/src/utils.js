// src/utils.js

export const generateGuestID = () => {
    return `guest_${Math.random().toString(36).substr(2, 9)}`; // Generate a simple unique guest ID
};
