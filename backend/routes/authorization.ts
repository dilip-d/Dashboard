import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import mongoose from "mongoose";

const router = Router();

const AuthorizationSchema = new mongoose.Schema({
  patientId: String,
  treatment: String,
  status: String,
});

const Authorization = mongoose.model("Authorization", AuthorizationSchema);

router.post("/", protect, async (req, res) => {
  const { patientId, treatment, status } = req.body;
  const newAuth = new Authorization({ patientId, treatment, status });
  await newAuth.save();
  res.json(newAuth);
});

export default router;
