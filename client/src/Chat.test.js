import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Chat from './components/Chat';

describe('Chat component', () => {
    it('renders chat messages and sends a message', async () => {
        // Mock user and token
        const user = { id: 1, username: 'testUser', token: 'mocked-token' };

        // Mock fetch messages function
        const mockFetchMessages = jest.fn().mockResolvedValue([
            { id: 1, senderId: 1, message: 'Test message 1', created_at: '2024-06-19T13:00:00.000Z' },
            { id: 2, senderId: 1, message: 'Test message 2', created_at: '2024-06-19T13:10:00.000Z' },
        ]);

        // Render the Chat component
        const { getByText, getByPlaceholderText } = render(
            <Chat token={user.token} user={user} fetchMessages={mockFetchMessages} />
        );

        // Wait for messages to be fetched and rendered
        await waitFor(() => {
            expect(getByText('Test message 1')).toBeInTheDocument();
            expect(getByText('Test message 2')).toBeInTheDocument();
        });

        // Simulate typing a new message
        const messageInput = getByPlaceholderText('Type your message...');
        fireEvent.change(messageInput, { target: { value: 'New test message' } });

        // Simulate sending the message
        const sendButton = getByText('Send');
        fireEvent.click(sendButton);

        // Wait for message to be sent and fetched again
        await waitFor(() => {
            expect(mockFetchMessages).toHaveBeenCalledTimes(2); // Ensure fetchMessages was called twice
            expect(getByText('New test message')).toBeInTheDocument();
        });
    });
});
