import {NextFunction, Request, Response} from "express";
import {ZodError} from "zod";
import {Exception} from "../exceptions";

export const exceptionHandler = (err: Error | null, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        return res.status(400).json(err);
    }

    if (err instanceof Exception) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    } else {
        return next(err);
    }
}