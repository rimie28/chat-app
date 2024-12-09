import React from 'react';
import { Container} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store.ts';;
import {getMessages, sendMessage} from "./features/chat/ChatMessagesSlice.ts";
import ChatForm from "./components/ChatForm.tsx";

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleSendMessage = async (author: string, message: string) => {
        await dispatch(sendMessage({ author, message }));
        dispatch(getMessages())
    };

    return (
        <Container>
            <ChatForm onSend={handleSendMessage} />
        </Container>
    );
};

export default App;
