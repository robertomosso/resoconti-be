import express from "express";

import { asyncHandler } from "../../utils/async-handler";
import { 
    getAllLookupData,
    getBackendTechnologiesController, 
    getDatabasesController, 
    getForeignLanguagesController, 
    getFrontendTechnologiesController, 
    getOfficesController, 
    getProgrammingLanguagesController, 
    getSoftwareUsedController 
} from "./lookup.controller";


const router = express.Router();

router.get('/all-lookup-data', asyncHandler(getAllLookupData))
router.get('/offices', asyncHandler(getOfficesController))
router.get('/programming-languages', asyncHandler(getProgrammingLanguagesController))
router.get('/frontend-technologies', asyncHandler(getFrontendTechnologiesController))
router.get('/backend-technologies', asyncHandler(getBackendTechnologiesController))
router.get('/databases', asyncHandler(getDatabasesController))
router.get('/software-used', asyncHandler(getSoftwareUsedController))
router.get('/foreign-languages', asyncHandler(getForeignLanguagesController))

export default router;
