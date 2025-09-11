import prisma from "../../prisma-client"


export const getOffices = async () => {
    return await prisma.office.findMany();
}

export const getProgrammingLanguages = async () => {
    return await prisma.programmingLanguages.findMany();
}

export const getFrontendTechnologies = async () => {
    return await prisma.frontendTechnologies.findMany();
}

export const getBackendTechnologies = async () => {
    return await prisma.backendTechnologies.findMany();
}

export const getDatabases = async () => {
    return await prisma.database.findMany();
}

export const getSoftwareUsed = async () => {
    return await prisma.softwareUsed.findMany();
}

export const getForeignLanguages = async () => {
    return await prisma.foreignLanguageLevel.findMany();
}