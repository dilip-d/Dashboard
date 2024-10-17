import mongoose from "mongoose";

const AuthorizationSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    doctorNotes: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Authorization = mongoose.model("Authorization", AuthorizationSchema);

export default Authorization;
