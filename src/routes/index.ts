import { Router } from "express";
import usersRoutes from "./user";
import {errorHandler} from "../middlewares/errorHandler";
import {exceptionHandler} from "../middlewares/exceptionHandler";

const router = Router();
router.use("/api/users", usersRoutes);

// Are middlewares to handle Node.JS errors
router.use(exceptionHandler as any);

// Theses are uncontrolled errors and it's good to apply a logger here and print the error to see it from the logs when deploying the app
router.use(errorHandler as any);

export default router;
