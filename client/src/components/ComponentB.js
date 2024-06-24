import React from 'react';

const ComponentB = ({ activateFunction }) => {
    return (
        <div>
            <button onClick={activateFunction}>Activate Chat</button>
        </div>
    );
};

export default ComponentB;
