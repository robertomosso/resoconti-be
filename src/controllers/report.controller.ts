import { Response } from "express";

import prisma from "../prisma-client"
import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";
import { excelModify } from "../services/excel.service";


export const getLastReport = async (req: CustomRequest, res: Response) => {
    // si controlla se è presente lo userId nella request, 
    // inserito in fase di login nel token e letto e inserito nella request dall'auth-middleware
    if (!req.userId) {
        throw new HttpError('User id non presente', 500);
    }

    const lastReport = await prisma.report.findFirst({
        where: {
            userId: req.userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (lastReport) {
        res.status(200).json({ report: lastReport });
    } else {
        res.status(404).json({ message: 'Resoconto non trovato' });
    }

}

export const postReport = async (req: CustomRequest, res: Response) => {
    // si controlla se è presente lo userId nella request, 
    // inserito in fase di login nel token e letto e inserito nella request dall'auth-middleware
    if (!req.userId) {
        throw new HttpError('User id non presente', 500);
    }

    // TODO da verificare se continuerà a servire in futuro
    // viene avviato il processo di modifica del file excel presente su drive
    await excelModify(req);

    // viene salvato a db il resoconto, solo nel caso la modifica dell'excel sia andata a buon fine
    await prisma.report.create({
        data: { ...req.body, userId: req.userId }
    });

    res.status(201).json({ message: 'Inserimento avvenuto con successo' });
}

export const getUserReports = async (req: CustomRequest, res: Response) => {
    const userId = req.params['userId'];

    if (!userId) {
        throw new HttpError('User id non presente', 500);
    }
    const result = await prisma.report.findMany({
        where: {
            userId
        }
    });

    res.status(200).json({ reports: result });
}