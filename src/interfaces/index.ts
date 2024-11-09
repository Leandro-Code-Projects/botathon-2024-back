export type Nullable<T> = T | null;

export interface ChatResponse {
    message: string;
    type?: 'text' | 'calendar' | 'options';
    options?: string[];
}

export interface Appointment {
    id: string;
    date: string;
    time: string;
    patientName: string;
    patientRut: string;
    specialty: string;
    institute: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    email: string;
}