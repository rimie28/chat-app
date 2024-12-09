import React, { useState } from 'react';
import {Box, Button, TextField} from '@mui/material';

interface ChatFormProps {
    onSend: (author: string, message: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({onSend}) => {
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (author.trim() === '' || message.trim() === '') {
            alert('Please enter author name and message!');
            return;
        }
        onSend(author, message);
        setAuthor('');
        setMessage('');
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
                label="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                variant="filled"
            />
            <TextField
                label="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
                Send
            </Button>
        </Box>
    );
};

export default ChatForm;