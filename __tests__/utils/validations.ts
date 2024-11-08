import { Request } from 'express';
import { ZodError } from 'zod';
import {validateCreateUser, validateGetUserById} from "../../src/utils/validations";

describe('Validations', () => {
    it('givenValidUserId_whenValidateGetUserById_thenDoNotThrowError', () => {
        const req = {
            params: { userId: '77720b21-ce68-4cc6-879b-a0ab79771ad6' },
        } as unknown as Request;

        expect(() => validateGetUserById(req)).not.toThrow();
    });

    it('givenInvalidUserId_whenValidateGetUserById_thenThrowZodError', () => {
        const req = {
            params: { userId: 'invalid-uuid' },
        } as unknown as Request;

        expect(() => validateGetUserById(req)).toThrow(ZodError);
    });

    it('givenValidUserData_whenValidateCreateUser_thenDoNotThrowError', () => {
        const req = {
            body: { name: 'John Doe' },
        } as Request;

        expect(() => validateCreateUser(req)).not.toThrow();
    });

    it('givenInvalidUserData_whenValidateCreateUser_thenThrowZodError', () => {
        const req = {
            body: { name: 'JD' },
        } as Request;

        expect(() => validateCreateUser(req)).toThrow(ZodError);
    });
});
