import { useState } from 'react';

// Custom hook to manage localStorage
const useLocalStorage = (key, initialValue) => {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;
    const [value, setValue] = useState(initial);

    const setStoredValue = (newValue) => {
        const updatedValue = newValue instanceof Function ? newValue(value) : newValue;
        setValue(updatedValue);
        localStorage.setItem(key, JSON.stringify(updatedValue));
    };

    // Function to remove item from localStorage
    const removeStoredValue = () => {
        setValue(undefined); // Optional: Set value to undefined or initialValue
        localStorage.removeItem(key);
    };

    return [value, setStoredValue, removeStoredValue]; // Return remove function as well
};

export default useLocalStorage;
