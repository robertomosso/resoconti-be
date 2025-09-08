import { Response } from "express";

import prisma from "../prisma-client"
import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";
import { excelModify } from "../services/excel.service";
import { formatDateToUsDate, toUtcDate } from "../utils/date-formatter";


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
        const report = {
            ...lastReport,
            startDate: formatDateToUsDate(lastReport.startDate),
            endDate: formatDateToUsDate(lastReport.endDate),
        };

        res.status(200).json({ report });
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
    // ! await excelModify(req);

    const startDateIso = toUtcDate(req.body.startDate);
    const endDateIso = toUtcDate(req.body.endDate);

    // viene salvato a db il resoconto, solo nel caso la modifica dell'excel sia andata a buon fine
    await prisma.report.create({
        data: {
            ...req.body,
            startDate: startDateIso,
            endDate: endDateIso,
            userId: req.userId
        }
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

    const reports = result.map(r => ({
        ...r,
        startDate: formatDateToUsDate(r.startDate),
        endDate: formatDateToUsDate(r.endDate),
    }));

    res.status(200).json({ reports: reports });
}