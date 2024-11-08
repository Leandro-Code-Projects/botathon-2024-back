jest.mock('dotenv', () => ({
    config: jest.fn(),
}));

describe('Configuration tests', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        // Resetear cache de módulos
        jest.resetModules();
        // Clonar las variables de entorno originales
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        // Restaurar las variables de entorno originales después de cada prueba
        process.env = originalEnv;
    });

    test('givenMissingPort_whenImportingConfig_thenThrowError', () => {
        delete process.env.PORT;
        // Importar el archivo de configuración usando import() dinámico
        expect(async () => {
            await import('../../src/config');
        }).rejects.toThrowError('Missing environment variables');
    });

    test('givenDefinedPort_whenImportingConfig_thenReturnCorrectConfig', async () => {
        process.env.PORT = '3000';

        const { config } = await import('../../src/config');

        expect(config.port).toBe('3000');
    });
});
