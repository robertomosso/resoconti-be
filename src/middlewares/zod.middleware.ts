import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

import { HttpError } from '../types/errors/http-error';

/**
 * 
 * @param schema ZodSchema
 * funzione di validazione del body tramite libreria Zod
 * se validazione fallisce verranno visualizzati in console gli errori
 * se validazione ok i dati sanificati verranno assegnati al body della request
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.error('validation errors:', errors);
      throw new HttpError('Dati inseriti non validi', 400);
    }

    req.body = result.data; // dati sanificati
    next();
  };
};