import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'
import { Role } from "@prisma/client";

import prisma from "../prisma-client";
import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";


export const canRegisterUserMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];

	if (!token) {
		throw new HttpError('Nessun token presente', 401);
	}

	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) {
		throw new HttpError('Errore nella lettura della chiave jwt', 500);
	}

	const decoded = jwt.verify(token, jwtSecret) as { id: string };

	const user = await prisma.user.findUnique({ where: { id: decoded.id } });
	if (!user || user.role !== Role.ADMIN) {
		throw new HttpError('Non autorizzato', 403);
	}

	next();
}