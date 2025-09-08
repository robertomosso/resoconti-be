import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import prisma from "../prisma-client"
import { HttpError } from '../types/errors/http-error';


const dominio = process.env.DOMINIO || '';

interface RegisterParams {
    name: string;
    lastname: string;
    email: string;
    fileId?: string;
    role: string;
}

export const register = async ({ name, lastname, email, fileId, role }: RegisterParams) => {
    if (!name || !lastname || !email?.includes(dominio) || (role === 'USER' && !fileId)) {
        throw new HttpError('Dati inseriti non validi', 400);
    }

    const password = process.env.DEFAULT_PASSWORD || 'changeme';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            lastname,
            email,
            password: hashedPassword,
            fileId,
            role: 'ADMIN',
        }
    });

    const { id } = user;
    return id;
}

export const login = async (email: string, password: string) => {
    if (!email?.includes(dominio) || !password) {
        throw new HttpError('Dati inseriti non validi', 400);
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) {
        throw new HttpError('Utente non trovato', 404);
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        throw new HttpError('Email/password non corretta', 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new HttpError('Errore nella lettura della chiave jwt', 500);
    }

    // nel token inserisco sia l'id che il fileId dello user
    // lo userId servirà nella creazione di un nuovo resoconto (in resoconto-routes)
    // il fileId nel download del file excel corretto (in excel-service)
    const token = jwt.sign(
        { id: user.id, fileId: user.fileId },
        jwtSecret,
        { expiresIn: '15m' }
    );
    if (!token) {
        throw new HttpError('Errore nella generazione del token', 500);
    }

    const { password: userPassword, ...userWithoutPass } = user;
    return { userWithoutPass, token }
}

export const changePassword = async (
    email: string,
    currentPassword: string,
    newPassword: string
) => {
    if (!email.includes(dominio) || !currentPassword || !newPassword) {
        throw new HttpError('Dati inseriti non validi', 400);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new HttpError('Utente non trovato', 404);
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
        throw new HttpError('Password attuale non corretta', 401);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prisma.user.update({
        where: { email },
        data: {
            password: hashedNewPassword,
            mustChangePassword: false,
        },
    });

    const { password: userPassword, ...userWithoutPass } = updatedUser;
    return userWithoutPass;
}