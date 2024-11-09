import {ChatResponse} from "../interfaces";

export class MockBotService {
    private readonly responses: Record<string, ChatResponse> = {
        'Quiero agendar una hora': {
            message: 'Para agendar una hora, necesitaré algunos datos. ¿Eres paciente actual de Teletón?',
            type: 'options',
            options: ['Sí, soy paciente', 'No, quiero ser paciente nuevo']
        },
        'Información sobre Teletón': {
            message: 'Teletón es una institución sin fines de lucro que trabaja en la rehabilitación de niños y jóvenes con discapacidad. ¿Qué te gustaría saber específicamente?',
            type: 'options',
            options: ['Centros de atención', 'Tratamientos disponibles', 'Historia de Teletón']
        },
        'Proceso de ingreso': {
            message: 'Para ingresar a Teletón se necesita: 1) Ser menor de 20 años 2) Tener una condición de salud que requiera rehabilitación 3) Contar con derivación médica. ¿Te gustaría conocer más detalles?',
            type: 'options',
            options: ['Requisitos específicos', 'Documentos necesarios', 'Contactar a un asesor']
        },
        'Donaciones': {
            message: '¡Gracias por tu interés en apoyar! Puedes realizar tu aporte de diferentes maneras. ¿Cómo te gustaría colaborar?',
            type: 'options',
            options: ['Donación única', 'Donación mensual', 'Aporte empresarial']
        }
    };

    async getResponse(message: string): Promise<ChatResponse> {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = this.responses[message];
        if (response) {
            return response;
        }

        // Respuesta por defecto si no encuentra coincidencia
        return {
            message: 'Entiendo tu consulta. ¿Te gustaría que te ayude con alguna de estas opciones?',
            type: 'options',
            options: [
                'Quiero agendar una hora',
                'Información sobre Teletón',
                'Proceso de ingreso',
                'Donaciones'
            ]
        };
    }
}