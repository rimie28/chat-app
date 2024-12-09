import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from "../../axiosAPI.ts";
import {Message} from "../../types";

export const getMessages = createAsyncThunk<Message[]>('messages/getMessages', async () => {
    const response = await axiosAPI.get('/');
    return response.data;
});

export const sendMessage = createAsyncThunk<void, { author: string; message: string }>(
    'messages/sendMessage',
    async (message) => {
        await axiosAPI.post('/', message);
    }
);

interface MessagesState {
    messages: Message[];
}

const initialState: MessagesState = {
    messages: [],
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
    },
});

export const messagesReducer = messagesSlice.reducer;
