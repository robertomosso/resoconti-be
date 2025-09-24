import prisma from "../../../prisma-client"
import { ReportSchema } from "../../../schemas/zod.schema";
import { formatDateToUsDate, toUtcDate } from "../../../utils/date-formatter";
import { excelModify } from "./excel.service";


export const getLastReport = async (userId: string) => {
    const lastReport = await prisma.report.findFirst({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    if (!lastReport) {
        return null;
    }

    const report = {
        ...lastReport,
        startDate: formatDateToUsDate(lastReport.startDate),
        endDate: formatDateToUsDate(lastReport.endDate),
    };

    return report;
}

export const postReport = async (body: ReportSchema, userId: string, fileId?: string) => {
    // da verificare se continuerà a servire in futuro
    // viene avviato il processo di modifica del file excel presente su drive
    if (fileId) {
        await excelModify(fileId, body);
    }

    const startDateIso = toUtcDate(body.startDate);
    const endDateIso = toUtcDate(body.endDate);

    // viene salvato a db il resoconto, solo nel caso la modifica dell'excel sia andata a buon fine
    await prisma.report.create({
        data: {
            ...body,
            startDate: startDateIso,
            endDate: endDateIso,
            userId
        }
    });
}

export const getUserReports = async (userId: string) => {
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

    return reports;
}