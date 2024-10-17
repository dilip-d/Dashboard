import { Router } from "express";
import {
  createAuthorization,
  getAllAuthorizations,
} from "../controllers/authorizationController";

const router = Router();

router.post("/", createAuthorization);
router.get("/", getAllAuthorizations);

export default router;
