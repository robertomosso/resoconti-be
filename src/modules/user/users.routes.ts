import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { 
    getUsersController, 
    getUserController, 
    hasUserController, 
    searchUsersController, 
    updateUserController 
} from "./user.controller";
import { onyAdminMiddleware } from "../../middlewares/only-admin.middleware";
import { validateBody } from "../../middlewares/zod.middleware";
import { SearchUsersSchema, UpdateUserSchema } from "../../schemas/zod.schema";
import { updateUserMiddleware } from "../../middlewares/update-user.middleware";


const router = express.Router();

// questa rotta può essere chiamata senza middleware, necessario per verificare lato frontend il reindirizzamento verso la pagina di registrazione
// nel caso non ci siano ancora utenti registrati sulla tabella user
router.get('/has-user', asyncHandler(hasUserController));
router.get('/get-user/:userId', authMiddleware, asyncHandler(getUserController));
router.get('/get-users', onyAdminMiddleware, asyncHandler(getUsersController));
router.post('/search-users', onyAdminMiddleware, validateBody(SearchUsersSchema), asyncHandler(searchUsersController));
router.patch('/update-user', authMiddleware, updateUserMiddleware, validateBody(UpdateUserSchema), asyncHandler(updateUserController));

export default router;
