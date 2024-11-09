import express from 'express';
import { AppointmentService } from '../services/appointmentService';

const router = express.Router();
const appointmentService = new AppointmentService();

router.get('/slots/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const slots = await appointmentService.getAvailableSlots(date);
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener horarios disponibles' });
    }
});

router.get('/cola', async (req, res) => {
    try {
        const foundAppointment = await appointmentService.getCurrentAppointmentCola()
        res.status(200).json(foundAppointment);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener horarios disponibles' });
    }
});

router.post('/', async (req, res) => {
    try {
        const appointmentData = req.body;
        const appointment = await appointmentService.createAppointment(appointmentData);
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la cita' });
    }
});

export default router;