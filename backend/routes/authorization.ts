import { Router } from "express";
import {
  createAuthorization,
  getAllAuthorizations,
  getAuthorizationByPatientId,
  updateAuthorizationStatus,
} from "../controllers/authorizationController";

const router = Router();

router.post("/", createAuthorization);
router.get("/", getAllAuthorizations);
router.get("/patient/:id", getAuthorizationByPatientId);
router.put("/status/:id", updateAuthorizationStatus);

export default router;
