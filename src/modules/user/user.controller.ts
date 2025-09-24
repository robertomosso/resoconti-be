import { Response } from "express";

import { CustomRequest } from "../../types/interfaces/custom-request.interface";
import { HttpError } from "../../types/errors/http-error";
import { getUser, getUsers, hasUser, searchUsers, updateUser } from "./user.service";


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

export const searchUsersController = async (req: CustomRequest, res: Response) => {
    const users = await searchUsers(req.body);
    res.status(200).json({ users });
}

export const updateUserController = async (req: CustomRequest, res: Response) => {
    const user = await updateUser(req.body);
    res.status(200).json({ user });
}

