import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import {exceptionHandler} from "../../src/middlewares/exceptionHandler";
import {Exception} from "../../src/exceptions";

describe('Exception Handler Middleware', () => {
    it('givenZodError_whenExceptionHandlerCalled_thenRespondWith400', () => {
        const err = new ZodError([]);
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn();

        exceptionHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(err);
    });

    it('givenCustomException_whenExceptionHandlerCalled_thenRespondWithCustomStatus', () => {
        const err = new Exception('Custom Error', 404);
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        const next = jest.fn();

        exceptionHandler(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: err.message });
    });

    it('givenUnhandledError_whenExceptionHandlerCalled_thenPassErrorToNext', () => {
        const err = new Error('Unhandled Error');
        const req = {} as Request;
        const res = {} as Response;
        const next = jest.fn();

        exceptionHandler(err, req, res, next);

        expect(next).toHaveBeenCalledWith(err);
    });
});
