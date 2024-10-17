import mongoose, { Schema, Document } from "mongoose";

interface IPatient extends Document {
  name: string;
  age: number;
  condition: string;
  medicalHistory: string[];
  treatments: string[];
}

const PatientSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  medicalHistory: { type: [String], required: true },
  treatments: { type: [String], required: true },
});

export default mongoose.model<IPatient>("Patient", PatientSchema);
