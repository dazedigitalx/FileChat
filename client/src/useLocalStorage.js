import { useState } from 'react';

// Custom hook to manage localStorage
const useLocalStorage = (key, initialValue) => {
    // Retrieve initial value from localStorage if it exists
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // State to store our value
    const [value, setValue] = useState(initial);

    // Function to update localStorage and state value
    const setStoredValue = (newValue) => {
        // If newValue is a function, calculate new value based on previous state
        const updatedValue = newValue instanceof Function ? newValue(value) : newValue;
        // Update state
        setValue(updatedValue);
        // Update localStorage
        localStorage.setItem(key, JSON.stringify(updatedValue));
    };

    // Return value and function to update it
    return [value, setStoredValue];
};

export default useLocalStorage;
