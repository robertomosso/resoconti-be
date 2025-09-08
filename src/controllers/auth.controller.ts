import { Request, Response } from "express";

import { changePassword, login, registerFirstUser, registerUser } from "../services/auth.service";


export const registerFirstUserController = async (req: Request, res: Response) => {
    const { name, lastname, email, password, fileId } = req.body;
    await registerFirstUser({ name, lastname, email, password, fileId });
    
    res.status(200).json({ message: 'Registrazione effettuata con successo' });
}

export const registerUserController = async (req: Request, res: Response) => {
    const { name, lastname, email, role, fileId } = req.body;
    await registerUser({ name, lastname, email, role, fileId });

    res.status(200).json({ message: 'Registrazione effettuata con successo' });
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