import express from "express";

import { canRegisterUserMiddleware } from "../middleware/can-register-user.middleware";
import { validateBody } from "../middleware/zod.middleware";
import { changePasswordSchema, loginSchema, registerFirstUserSchema, registerUserSchema } from "../schemas/zod.schema";
import { asyncHandler } from "../utils/async-handler";
import { changePasswordController, loginController, registerFirstUserController, registerUserController } from "../controllers/auth.controller";
import { canRegisterFirstUserMiddleware } from "../middleware/can-register-first-user.middleware";


const router = express.Router();

router.post(
    '/register-first-user',
    asyncHandler(canRegisterFirstUserMiddleware),
    validateBody(registerFirstUserSchema),
    asyncHandler(registerFirstUserController)
)

router.post(
    '/register-user',
    asyncHandler(canRegisterUserMiddleware),
    validateBody(registerUserSchema),
    asyncHandler(registerUserController)
)

router.post(
    '/login',
    validateBody(loginSchema),
    asyncHandler(loginController)
)

router.post(
    '/change-password',
    validateBody(changePasswordSchema),
    asyncHandler(changePasswordController)
);

export default router;