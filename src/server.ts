import 'dotenv/config';
import express from "express";

import { authMiddleware } from "./middlewares/auth.middleware";
import { securityMiddleware } from './middlewares/security.middleware';
import { authRateLimiter, globalRateLimiter } from './middlewares/rate-limiter.middleware';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { errorLoggerMiddleware } from './middlewares/error-logger.middleware';
import authRoutes from './modules/auth/auth.routes'
import reportRoutes from './modules/report/report.routes'
import usersRoutes from './modules/user/users.routes'
import lookupRoutes from './modules/lookup/lookup.routes'

const app = express();

// settaggio necessario se il server è dietro un reverse proxy (e uno solo, come su Render.com)
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

// middlewares
app.use(securityMiddleware);
app.use(express.json());
app.use(globalRateLimiter);
app.use(loggerMiddleware());

app.use('/auth', authRateLimiter, authRoutes);
app.use('/users', usersRoutes);
app.use('/report', authMiddleware, reportRoutes);
app.use('/lookup', authMiddleware, lookupRoutes);

app.use(errorLoggerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});