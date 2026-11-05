import express from "express";
import helmet from "helmet";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import requestLogger from "./middlewares/request-logger.js";
import errorHandler from "./middlewares/error-handler.js";
import notFound from "./middlewares/not-found.js";
import { generalLimiter } from "./middlewares/rate-limiters.js";
import authRoutes from "./modules/auth/auth.routes.js"

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(
    cors({
        origin: "http://localhost:3001",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(requestLogger);
app.use(generalLimiter);

app.use("/api", healthRoutes);
app.use('/api/auth', authRoutes)


app.use(notFound);
// Centralized Error Handler
app.use(errorHandler);

export default app;