import { Router } from "express";
import authRoutes from "../routes/auth";
import patientRoutes from "../routes/patient";
import authorizationRoutes from "../routes/authorization";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/patients", patientRoutes);
router.use("/api/authorizations", authorizationRoutes);

export default router;
