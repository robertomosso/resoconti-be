import { Response } from "express";

import prisma from "../prisma-client"
import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";


export const hasUser = async (req: CustomRequest, res: Response) => {
    const count = await prisma.user.count();
    res.json({ hasUser: count > 0 });
}

export const getUser = async (req: CustomRequest, res: Response) => {
    const user = await prisma.user.findUnique({
        select: {
            id: true,
            name: true,
            lastname: true,
            workProfile: true,
        },
        where: {
            id: req.params['userId']
        },
    });

    if (!user) {
        throw new HttpError('Utente non trovato', 404);
    }

    res.status(200).json({ user });
}

export const getUsers = async (req: CustomRequest, res: Response) => {
    // TODO filtrare per utenti con solo role user?
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            lastname: true,
        }
    });
    res.status(200).json({ users });
}