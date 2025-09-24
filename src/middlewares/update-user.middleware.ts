import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";

export const updateUserMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.userId !== req.body?.userId) {
        return next(new HttpError('Non autorizzato', 403));
    }

	next();
}