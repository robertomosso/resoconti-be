import express from "express";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/async-handler";
import { getUsersController, getUserController, hasUserController } from "./user.controller";


const router = express.Router();

// questa rotta può essere chiamata senza middleware, necessario per verificare lato frontend il reindirizzamento verso la pagina di registrazione
// nel caso non ci siano ancora utenti registrati sulla tabella user
router.get('/has-user', asyncHandler(hasUserController));
router.get('/get-user/:userId', authMiddleware, asyncHandler(getUserController));
router.get('/get-users', authMiddleware, asyncHandler(getUsersController));

export default router;
