import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
    message: string;
    createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ChatMessage = mongoose.models.ChatMessage || mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);

export default ChatMessage;
