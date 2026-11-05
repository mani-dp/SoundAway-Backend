import { Router } from "express";

import { register } from "./auth.controller.js";
import { validateRegister } from "./auth.validation.js";

import {
    registerLimiter,
} from "../../middlewares/rate-limiters.js";

const router = Router();

router.post(
    "/register",
    registerLimiter,
    validateRegister,
    register
);

export default router;