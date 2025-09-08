import express from "express";

import { canRegisterUserMiddleware } from "../middleware/can-register-user.middleware";
import { validateBody } from "../middleware/zod.middleware";
import { changePasswordSchema, loginSchema, registerUserSchema, registerAdminSchema } from "../schemas/zod.schema";
import { asyncHandler } from "../utils/async-handler";
import { changePasswordController, loginController, registerAdminController, registerUserController } from "../controllers/auth.controller";


const router = express.Router();

// questa rotta può chiamarla solo user con role "admin" oppure se tabella user è ancora vuota
router.post('/register-admin', canRegisterUserMiddleware('register-admin'), validateBody(registerAdminSchema), asyncHandler(registerAdminController))
// questa rotta può chiamarla user con role "admin"
router.post('/register-user', canRegisterUserMiddleware(), validateBody(registerUserSchema), asyncHandler(registerUserController))
router.post('/login', validateBody(loginSchema), asyncHandler(loginController))
router.post('/change-password', validateBody(changePasswordSchema), asyncHandler(changePasswordController));

export default router;