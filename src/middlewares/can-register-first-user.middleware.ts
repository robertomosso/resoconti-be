import { NextFunction, Response } from "express";

import prisma from "../prisma-client";
import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";


export const canRegisterFirstUserMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const count = await prisma.user.count();
    if (count > 0) {
        throw new HttpError('Non autorizzato', 403);
    }
    next();
}