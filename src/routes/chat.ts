import express from "express";
import {MockBotService} from "../services/mockBotService";

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

export default router;
