import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_connection_string';

const ChatMessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!mongoose.connection.readyState) {
        await mongoose.connect(MONGODB_URI);
    }

    if (req.method === 'GET') {
        const messages = await ChatMessage.find().sort({ createdAt: -1 }).exec();
        res.status(200).json(messages);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
