import { Request, Response, NextFunction } from 'express';
import {errorHandler} from "../../src/middlewares/errorHandler";

describe('Error Handler Middleware', () => {
    it('givenError_whenErrorHandlerCalled_thenRespondWith500AndLogError', () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn();

        const error = new Error('Test Error');

        errorHandler(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error });
    });
});
