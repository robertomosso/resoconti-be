import { Response } from "express";

import { CustomRequest } from "../../types/interfaces/custom-request.interface";
import {
    getProgrammingLanguages,
    getOffices,
    getFrontendTechnologies,
    getBackendTechnologies,
    getDatabases,
    getSoftwareUsed,
    getForeignLanguages
} from "./lookup.service";

export const getAllLookupData = async (req: CustomRequest, res: Response) => {
    const [
        offices,
        programmingLanguages,
        frontendTechnologies,
        backendTechnologies,
        databases,
        softwareUsed,
        foreignLanguages
    ] = await Promise.all([
        getOffices(),
        getProgrammingLanguages(),
        getFrontendTechnologies(),
        getBackendTechnologies(),
        getDatabases(),
        getSoftwareUsed(),
        getForeignLanguages()
    ]);

    res.status(200).json({
        offices,
        programmingLanguages,
        frontendTechnologies,
        backendTechnologies,
        databases,
        softwareUsed,
        foreignLanguages
    });
}

export const getOfficesController = async (req: CustomRequest, res: Response) => {
    const offices = await getOffices();
    res.status(200).json(offices);
}

export const getProgrammingLanguagesController = async (req: CustomRequest, res: Response) => {
    const programmingLanguages = await getProgrammingLanguages();
    res.status(200).json(programmingLanguages);
}

export const getFrontendTechnologiesController = async (req: CustomRequest, res: Response) => {
    const frontendTechnologies = await getFrontendTechnologies();
    res.status(200).json(frontendTechnologies);
}

export const getBackendTechnologiesController = async (req: CustomRequest, res: Response) => {
    const backendTechnologies = await getBackendTechnologies();
    res.status(200).json(backendTechnologies);
}

export const getDatabasesController = async (req: CustomRequest, res: Response) => {
    const databases = await getDatabases();
    res.status(200).json(databases);
}

export const getSoftwareUsedController = async (req: CustomRequest, res: Response) => {
    const softwareUsed = await getSoftwareUsed();
    res.status(200).json(softwareUsed);
}

export const getForeignLanguagesController = async (req: CustomRequest, res: Response) => {
    const foreignLanguages = await getForeignLanguages();
    res.status(200).json(foreignLanguages);
}