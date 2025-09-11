import express from "express";

import { canRegisterUserMiddleware } from "../../middlewares/can-register-user.middleware";
import { validateBody } from "../../middlewares/zod.middleware";
import { changePasswordSchema, loginSchema, registerFirstUserSchema, registerUserSchema } from "../../schemas/zod.schema";
import { asyncHandler } from "../../utils/async-handler";
import { changePasswordController, loginController, registerFirstUserController, registerUserController } from "./auth.controller";
import { canRegisterFirstUserMiddleware } from "../../middlewares/can-register-first-user.middleware";


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