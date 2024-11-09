import {Appointment} from "../interfaces";

export class AppointmentService {
    private availableSlots: Record<string, string[]> = {
        "2024-11-12": ["09:00", "10:00", "11:00", "15:00", "16:00"],
        "2024-11-13": ["09:00", "10:00", "14:00", "15:00", "16:00"],
        "2024-11-14": ["09:00", "11:00", "14:00", "15:00", "16:00"],
    };

    private appointments: Appointment[] = [];

    async getAvailableSlots(date: string): Promise<string[]> {
        // En una implementación real, esto vendría de una base de datos
        return this.availableSlots[date] || [];
    }

    async createAppointment(appointmentData: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> {
        const id = Date.now().toString();
        const appointment: Appointment = {
            ...appointmentData,
            id,
            status: 'pending'
        };

        this.appointments.push(appointment);
        return appointment;
    }
}