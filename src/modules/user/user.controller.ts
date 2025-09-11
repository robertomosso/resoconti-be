import { Response } from "express";

import { CustomRequest } from "../../types/interfaces/custom-request.interface";
import { HttpError } from "../../types/errors/http-error";
import { getUser, getUsers, hasUser } from "./user.service";


export const hasUserController = async (req: CustomRequest, res: Response) => {
    const count = await hasUser()
    res.json({ hasUser: count > 0 });
}

export const getUserController = async (req: CustomRequest, res: Response) => {
    if (!req.params['userId']) {
        throw new HttpError('UserId non presente', 400);
    }

    const user = await getUser(req.params['userId']);

    if (!user) {
        throw new HttpError('Utente non trovato', 404);
    }

    res.status(200).json({ user });
}

export const getUsersController = async (req: CustomRequest, res: Response) => {
    const users = await getUsers();
    res.status(200).json({ users });
}

// TODO ricerca utenti per filtri (body?)
// export const getUsersByFiltersController = async (req: CustomRequest, res: Response) => {

//     const body = req.body;

//     const users
// }