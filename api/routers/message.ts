import express from "express";
import fileDb from "../fileDb";


const messageRouter = express.Router();

// @ts-ignore
messageRouter.get('/', async (req, res) => {
    const queryDate = req.query.datetime as string;

    if (queryDate) {
        const date = new Date(queryDate);
        if (isNaN(date.getTime())) {
            return res.status(400).send("Invalid date");
        }

        const messages = await fileDb.getMessageByDate(date);
        return res.send(messages);
    }

    const messages = await fileDb.getMessages();
    return res.send(messages.slice(-30));
});

// @ts-ignore
messageRouter.post('/', async (req, res) => {
    const { author, message } = req.body;

    if (!author || !message) {
        return res.status(400).send({ error: 'Author and message are required' });
    }

    const newMessage = await fileDb.addMessage(author, message);
    res.status(201).send(newMessage);
})

export default messageRouter;