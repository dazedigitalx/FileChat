import React, { useEffect, useState } from 'react';

const Notes = ({ user }) => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                console.error('Failed to fetch notes:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <h2>Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
