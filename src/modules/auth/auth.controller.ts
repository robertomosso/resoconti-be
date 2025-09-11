import { Request, Response } from "express";

import { changePassword, login, registerFirstUser, registerUser } from "./auth.service";
import { HttpError } from "../../types/errors/http-error";


const dominio = process.env.DOMINIO || '';

export const registerFirstUserController = async (req: Request, res: Response) => {
    const { name, lastname, email, password, fileId } = req.body;

    if (!name || !lastname || !email?.includes(dominio) || !password) {
        throw new HttpError('Dati inseriti non validi', 400);
    }

    await registerFirstUser({ name, lastname, email, password, fileId });
    
    res.status(200).json({ message: 'Registrazione effettuata con successo' });
}

export const registerUserController = async (req: Request, res: Response) => {
    const { name, lastname, email, role, fileId } = req.body;

    if (!name || !lastname || !email?.includes(dominio)) {
        throw new HttpError('Dati inseriti non validi', 400);
    }

    await registerUser({ name, lastname, email, role, fileId });

    res.status(200).json({ message: 'Registrazione effettuata con successo' });
}

export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email?.includes(dominio) || !password) {
        throw new HttpError('Dati inseriti non validi', 400);
    }

    const { userWithoutPass, token } = await login(email, password);

    res.status(200).json({
        message: 'Login effettuato con successo',
        user: userWithoutPass,
        token,
    });
}

export const changePasswordController = async (req: Request, res: Response): Promise<void> => {
    const { email, currentPassword, newPassword } = req.body;

    if (!email.includes(dominio) || !currentPassword || !newPassword) {
        throw new HttpError('Dati inseriti non validi', 400);
    }

    const userWithoutPass = await changePassword(email, currentPassword, newPassword);

    res.status(200).json({
        message: 'Password aggiornata correttamente',
        user: userWithoutPass
    });
}