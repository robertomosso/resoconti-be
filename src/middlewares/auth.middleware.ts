import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken'

import { CustomRequest } from "../types/interfaces/custom-request.interface";
import { HttpError } from "../types/errors/http-error";

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
	const token = req.headers['authorization'];

	if (!token) {
		return next(new HttpError('Nessun token presente', 401));
	}

	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) {
		return next(new HttpError('Errore nella lettura della chiave jwt', 500));
	}

	jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
			return next(new HttpError('Token non valido', 401));
		}

		// nel token inserisco sia l'id che il fileId dello user
		// lo userId servirà nella creazione di un nuovo resoconto (in resoconto-routes)
		// il fileId nel download del file excel corretto (in excel-service)
		req.userId = (decoded as jwt.JwtPayload)?.id;
		req.fileId = (decoded as jwt.JwtPayload)?.fileId;
		next();
	})
}