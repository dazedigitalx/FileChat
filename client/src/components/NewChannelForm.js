import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const NewChannelForm = () => {
    const { user, createChannel } = useAuth();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleCreateChannel = async (e) => {
        e.preventDefault();
        try {
            await createChannel({ name, description });
            setName('');
            setDescription('');
        } catch (error) {
            setError(error.message || 'Failed to create channel');
        }
    };

    return (
        <form onSubmit={handleCreateChannel}>
            <input
                type="text"
                placeholder="Channel name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Channel description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">Create Channel</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default NewChannelForm;
