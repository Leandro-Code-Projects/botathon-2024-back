import { LastMessage } from '../interfaces';

class ChatService {
    private lastMessage: LastMessage | null = null;

    setLastMessage(message: string, contextMessages: string[]): LastMessage {
        this.lastMessage = {
            id: Date.now().toString(),
            message,
            replied: false,
            seen: false,
            timestamp: new Date(),
            contextMessages
        };
        return this.lastMessage;
    }

    getLastMessage(): LastMessage | null {
        return this.lastMessage;
    }

    setReply(): void {
        if (this.lastMessage) {
            this.lastMessage.replied = true;
        }
    }

    setSeen(): void {
        if (this.lastMessage) {
            this.lastMessage.seen = true;
        }
    }
}

export const chatService = new ChatService();