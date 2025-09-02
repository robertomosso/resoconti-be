import { Request } from 'express';

// aggiunta tipizzazione per evitare la perdita dei parametri della normale request di Express,
// altrimenti in fase di build e deploy su Render uscivano errori di questo tipo:
// error TS2339: Property 'body' does not exist on type 'CustomRequest'.
export interface CustomRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  userId?: string;
  fileId?: string;
}