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
        const { message } = req.body;
        console.log("router.post('/send') message: " + message)
        chatService.setUserMessage(message);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para que AA consulte el último mensaje
router.get('/pending', (req, res) => {
    const lastMessage = chatService.getLastMessage();
    console.log("router.get('/pending') lastMessage: " + JSON.stringify(lastMessage))
    res.json({
        message: lastMessage.message,
        replied: lastMessage.replied
    });
});

// Endpoint para que AA envíe la respuesta
router.post('/reply', express.text({ type: '*/*' }), (req, res) => {
    try {
        let message = req.body;

        // Limpieza básica del mensaje
        message = message
            .replace(/^{\s*"message"\s*:\s*"/, '') // Remover inicio si viene como JSON malformado
            .replace(/"\s*}$/, '')                 // Remover final si viene como JSON malformado
            .replace(/\\"/g, '"')                  // Reemplazar \" por "
            .replace(/\\/g, '')                    // Remover backslashes extras
            .trim();                               // Remover espacios extras

        console.log("router.post('/reply') message: " + message)
        chatService.setBotResponse(message);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint para que el frontend consulte si hay respuesta
router.get('/check-reply', (req, res) => {
    const lastMessage = chatService.getLastMessage();
    console.log("router.get('/check-reply') lastMessage: " + lastMessage)
    res.json({
        hasReply: lastMessage.replied,
        message: lastMessage.botResponse
    });
});

export default router;
