import {Message} from "./types";
import {promises as fs} from 'fs';
import crypto from "crypto";


const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init(): Promise<void> {
        try{
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString());
        } catch (err) {
            console.error(err);
        }
    },

    async getMessages():Promise<Message[]> {
        return data;
    },

    async addMessage(author: string, message: string):Promise<Message> {
        const newMessage: Message = {
            id: crypto.randomUUID(),
            author,
            message,
            datetime: new Date().toISOString(),
        };
        data.push(newMessage);
        await this.save();
        return newMessage;
    },

    async save():Promise<void> {
        await fs.writeFile(fileName, JSON.stringify(data));
    },

    async getMessageByDate(date: Date):Promise<Message[]> {
        return data.filter(message => new Date(message.datetime) > date);
    }
}
export default fileDb;