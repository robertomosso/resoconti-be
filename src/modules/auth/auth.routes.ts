import express from "express";

import { onyAdminMiddleware } from "../../middlewares/only-admin.middleware";
import { validateBody } from "../../middlewares/zod.middleware";
import { ChangePasswordSchema, LoginSchema, RegisterFirstUserSchema, RegisterUserSchema } from "../../schemas/zod.schema";
import { asyncHandler } from "../../utils/async-handler";
import { changePasswordController, loginController, registerFirstUserController, registerUserController } from "./auth.controller";
import { canRegisterFirstUserMiddleware } from "../../middlewares/can-register-first-user.middleware";


const router = express.Router();

router.post(
    '/register-first-user',
    asyncHandler(canRegisterFirstUserMiddleware),
    validateBody(RegisterFirstUserSchema),
    asyncHandler(registerFirstUserController)
)

router.post(
    '/register-user',
    asyncHandler(onyAdminMiddleware),
    validateBody(RegisterUserSchema),
    asyncHandler(registerUserController)
)

router.post(
    '/login',
    validateBody(LoginSchema),
    asyncHandler(loginController)
)

router.post(
    '/change-password',
    validateBody(ChangePasswordSchema),
    asyncHandler(changePasswordController)
);

export default router;