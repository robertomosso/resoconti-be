import prisma from "../../../prisma-client"
import { formatDateToUsDate, toUtcDate } from "../../../utils/date-formatter";


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

// TODO tipizzare body
export const postReport = async (body: any, userId: string) => {
    // da verificare se continuerà a servire in futuro
    // viene avviato il processo di modifica del file excel presente su drive
    // ! await excelModify(req);

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