import {NextFunction, Request, Response} from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500);
    return res.json({
        error: err,
    });
}