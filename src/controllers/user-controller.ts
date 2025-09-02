import { Response } from "express";

import prisma from "../prisma-client"
import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";


export const hasUser = async (req: CustomRequest, res: Response) => {
    try {
        const count = await prisma.user.count();
        res.json({ hasUser: count > 0 })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Errore del server'
        throw new HttpError(message, 500);
    }
}

export const getUsers = async (req: CustomRequest, res: Response) => {
    try {
        // TODO filtrare per utenti con solo role user?
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            }
        });
        res.json({ users })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Errore del server'
        throw new HttpError(message, 500);
    }
}