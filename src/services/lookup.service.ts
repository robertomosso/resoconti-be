import prisma from "../prisma-client"
import { HttpError } from "../types/errors/http-error";

export const getOffices = async () => {
    try {
        return await prisma.office.findMany();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Errore del server'
        throw new HttpError(message, 500);
    }
}

export const getProgrammingLanguages = async () => {
    try {
        return await prisma.programmingLanguages.findMany();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Errore del server'
        throw new HttpError(message, 500);
    }
}

export const getFrontendTechnologies = async () => {
    try {
        return await prisma.frontendTechnologies.findMany();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Errore del server'
        throw new HttpError(message, 500);
    }
}

export const getBackendTechnologies = async () => {
    try {
        return await prisma.backendTechnologies.findMany();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Errore del server'
        throw new HttpError(message, 500);
    }
}