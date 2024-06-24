import React, { useState } from 'react';

const NoteForm = ({ onSave }) => {
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(note);
        setNote('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your note here"
            />
            <button type="submit">Save Note</button>
        </form>
    );
};

export default NoteForm;
