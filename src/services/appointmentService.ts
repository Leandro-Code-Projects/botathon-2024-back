import {Appointment, Nullable} from "../interfaces";
import { v4 as uuidV4 } from "uuid"
import axios from "axios"

export class AppointmentService {
    private currentAppointmentCola: Nullable<Appointment> = null

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

    public async getCurrentAppointmentCola() {
        if (this.currentAppointmentCola) {
            return this.currentAppointmentCola
        }

        const defaultAppointment: Appointment = {
            id: uuidV4(),
            email: "leandromarceloclases@gmail.com",
            status: "pending",
            date: new Date().toISOString(),
            institute: "a",
            patientName: "a",
            patientRut: "a",
            specialty: "a",
            time: "as"
        }
        return defaultAppointment
    }

    async createAppointment(appointmentData: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> {
        const id = uuidV4()
        const appointment: Appointment = {
            ...appointmentData,
            id,
            status: 'pending'
        };

        this.appointments.push(appointment);
        this.currentAppointmentCola = appointment;
        this.triggerBotAgendamiento("agendamiento", "vce923@gmail.com")
        return appointment;
    }

    private async triggerBotAgendamiento(subject: string, email: string) {
        try {
            await axios.post("https://tempp-mails-api.leandrocode.me/api/send-email", {
                subject,
                email
            })
        } catch (err) {
            console.log("Error triggerBotAgendamiento")
            console.log(err)
        }
    }
}