import { Request, Response } from "express";

import { changePassword, login, register } from "../services/auth.service";


export const registerAdminController = async (req: Request, res: Response) => {
    const { name, lastname, email, fileId } = req.body;
    const userId = register({ name, lastname, email, fileId, role: 'ADMIN' });

    res.status(200).json({
        message: 'Registrazione effettuata con successo',
        userId,
    });
}

export const registerUserController = async (req: Request, res: Response) => {
    const { name, lastname, email, fileId } = req.body;
    const userId = register({ name, lastname, email, fileId, role: 'USER' });

    res.status(200).json({
        message: 'Registrazione effettuata con successo',
        userId,
    });
}

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const { userWithoutPass, token } = await login(email, password);

    res.status(200).json({
        message: 'Login effettuato con successo',
        user: userWithoutPass,
        token,
    });
}

export const changePasswordController = async (req: Request, res: Response): Promise<void> => {
    const { email, currentPassword, newPassword } = req.body;
    const userWithoutPass = await changePassword(email, currentPassword, newPassword);

    res.status(200).json({
        message: 'Password aggiornata correttamente',
        user: userWithoutPass
    });
}