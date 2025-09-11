import { Response } from "express";

import { CustomRequest } from "../../types/interfaces/custom-request.interface";
import { HttpError } from "../../types/errors/http-error";
import { excelModify } from "./services/excel.service";
import { getLastReport, getUserReports, postReport } from "./services/report.service";


export const getLastReportController = async (req: CustomRequest, res: Response) => {
    // si controlla se è presente lo userId nella request, 
    // inserito in fase di login nel token e letto e inserito nella request dall'auth-middleware
    if (!req.userId) {
        throw new HttpError('User id non presente', 500);
    }

    const report = await getLastReport(req.userId);
    if (!report) {
        res.status(404).json({ message: 'Resoconto non trovato' });
    }

    res.status(200).json({ report });
}

export const postReportController = async (req: CustomRequest, res: Response) => {
    // si controlla se è presente lo userId nella request, 
    // inserito in fase di login nel token e letto e inserito nella request dall'auth-middleware
    if (!req.userId) {
        throw new HttpError('User id non presente', 500);
    }

    await postReport(req.body, req.userId);

    res.status(201).json({ message: 'Inserimento avvenuto con successo' });
}

export const getUserReportsController = async (req: CustomRequest, res: Response) => {
    const userId = req.params['userId'];

    if (!userId) {
        throw new HttpError('User id non presente', 500);
    }

    const reports = await getUserReports(userId);

    res.status(200).json({ reports: reports });
}