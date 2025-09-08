import { Response } from "express";

import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { getProgrammingLanguages, getOffices, getFrontendTechnologies, getBackendTechnologies } from "../services/lookup.service";


export const getOfficesController = async (req: CustomRequest, res: Response) => {
    const offices = await getOffices();
    res.status(200).json({ res: offices });
}

export const getProgrammingLanguagesController = async (req: CustomRequest, res: Response) => {
    const programmingLanguages = await getProgrammingLanguages();
    res.status(200).json({ res: programmingLanguages });
}

export const getFrontendTechnologiesController = async (req: CustomRequest, res: Response) => {
    const frontendTechnologies = await getFrontendTechnologies();
    res.status(200).json({ res: frontendTechnologies });
}

export const getBackendTechnologiesController = async (req: CustomRequest, res: Response) => {
    const backendTechnologies = await getBackendTechnologies();
    res.status(200).json({ res: backendTechnologies });
}