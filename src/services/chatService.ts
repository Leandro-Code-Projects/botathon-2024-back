import { LastMessage } from '../interfaces';

class ChatService {
    private lastMessage: LastMessage = {
        message: '',
        replied: true, // Inicialmente true para que el bot no procese nada
        botResponse: null
    };

    setUserMessage(message: string): void {
        this.lastMessage = {
            message,
            replied: false,
            botResponse: null
        };
    }

    setBotResponse(response: string): void {
        if (this.lastMessage) {
            this.lastMessage.botResponse = response;
            this.lastMessage.replied = true;
        }
    }

    getLastMessage(): LastMessage {
        return this.lastMessage;
    }
}

export const chatService = new ChatService();