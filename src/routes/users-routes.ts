import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/async-handler";
import { getUsers, hasUser } from "../controllers/user-controller";


const router = express.Router();

// questa rotta può essere chiamata senza middleware, necessario per verificare lato frontend il reindirizzamento verso la pagina di registrazione
// nel caso non ci siano ancora utenti registrati sulla tabella user
router.get('/has-user', asyncHandler(hasUser))
router.get('/get-users', authMiddleware, asyncHandler(getUsers))

export default router;
