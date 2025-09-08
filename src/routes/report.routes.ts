import express from "express";

import { validateBody } from "../middleware/zod.middleware";
import { resocontoSchema } from "../schemas/zod.schema";
import { asyncHandler } from "../utils/async-handler";
import { getUserReports, postReport, getLastReport } from "../controllers/report.controller";

const router = express.Router();

router.get('/last-report', asyncHandler(getLastReport))
router.post('/post-report', validateBody(resocontoSchema), asyncHandler(postReport))
router.get('/user-reports/:userId', asyncHandler(getUserReports))

export default router;