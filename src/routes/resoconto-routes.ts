import express from "express";

import { validateBody } from "../middleware/zod.middleware";
import { resocontoSchema } from "../schemas/zod-schema";
import { asyncHandler } from "../utils/async-handler";
import { getResocontiUtente, inserimentoResoconto, ultimoResoconto } from "../controllers/resoconto-controller";

const router = express.Router();

router.get('/ultimo-resoconto', asyncHandler(ultimoResoconto))
router.post('/inserisciResoconto', validateBody(resocontoSchema), asyncHandler(inserimentoResoconto))
router.get('/resoconti-utente/:userId', asyncHandler(getResocontiUtente))

export default router;