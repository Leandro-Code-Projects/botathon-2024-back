import request from 'supertest';
import app from "../../src/app";

describe('Index Routes', () => {
    it('givenUndefinedRoute_whenAccess_thenReturn404', async () => {
        const res = await request(app).get('/non-existent-route');

        expect(res.status).toBe(404);
    });

    it('givenInvalidUserId_whenGetUserById_thenUseExceptionHandlerAndReturn400', async () => {
        const res = await request(app).get('/api/users/invalid-uuid');

        expect(res.status).toBe(400);
    });
});

