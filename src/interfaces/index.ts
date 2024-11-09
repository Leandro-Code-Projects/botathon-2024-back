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

export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    type?: 'options' | 'text';
    options?: string[];
}

export interface UserInfo {
    name: string;
    rut: string;
    institute: string;
    specialty: string;
    email: string;
}

export interface LastMessage {
    id: string;
    message: string;
    replied: boolean;
    seen: boolean;
    timestamp: Date;
    contextMessages: string[];
}