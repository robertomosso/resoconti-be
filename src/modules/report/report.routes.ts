import express from "express";

import { validateBody } from "../../middlewares/zod.middleware";
import { reportSchema } from "../../schemas/zod.schema";
import { asyncHandler } from "../../utils/async-handler";
import { getUserReportsController, postReportController, getLastReportController } from "./report.controller";


const router = express.Router();

router.get('/last-report', asyncHandler(getLastReportController))
router.post('/post-report', validateBody(reportSchema), asyncHandler(postReportController))
router.get('/user-reports/:userId', asyncHandler(getUserReportsController))

export default router;