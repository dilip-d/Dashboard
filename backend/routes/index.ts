import { Router } from "express";
import authRoutes from "../routes/auth";
import patientRoutes from "../routes/patient";
import authorizationRoutes from "../routes/authorization";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/patients", protect, patientRoutes);
router.use("/api/authorizations", protect, authorizationRoutes);

export default router;
