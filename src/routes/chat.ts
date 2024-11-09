import express from "express";
import {MockBotService} from "../services/mockBotService";
import { chatService } from '../services/chatService';

const router = express.Router();
const botService = new MockBotService();

router.post('/', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await botService.getResponse(message);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para que el frontend envíe mensajes
router.post('/send', (req, res) => {
    try {
        const { message, contextMessages } = req.body;
        const lastMessage = chatService.setLastMessage(message, contextMessages);
        res.json({ success: true, messageId: lastMessage.id });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para que AA consulte el último mensaje
router.get('/pending', (req, res) => {
    const lastMessage = chatService.getLastMessage();
    if (lastMessage && !lastMessage.replied) {
        res.json({
            message: lastMessage.message,
            contextMessages: lastMessage.contextMessages
        });
    } else {
        res.json({ message: null });
    }
});

// Endpoint para que AA envíe la respuesta
router.post('/reply', (req, res) => {
    try {
        const { message } = req.body;
        chatService.setReply();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para que el frontend consulte si hay respuesta
router.get('/check-reply/:messageId', (req, res) => {
    const lastMessage = chatService.getLastMessage();
    if (lastMessage && lastMessage.id === req.params.messageId) {
        if (lastMessage.replied && !lastMessage.seen) {
            chatService.setSeen();
            res.json({
                hasReply: true,
                message: lastMessage.message
            });
        } else {
            res.json({ hasReply: false });
        }
    } else {
        res.json({ hasReply: false });
    }
});

export default router;
