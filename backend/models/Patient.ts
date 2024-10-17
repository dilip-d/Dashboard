import mongoose, { Schema, Document } from "mongoose";

interface ILabResult {
  testName: string;
  result: string;
  date: string;
  normalRange: string;
}

interface IPatient extends Document {
  _id: string;
  name: string;
  age: number;
  condition: string;
  medicalHistory: string[];
  treatments: string[];
  labResults: ILabResult[];
}

const LabResultSchema: Schema = new Schema({
  testName: { type: String, required: true },
  result: { type: String, required: true },
  date: { type: String, required: true },
  normalRange: { type: String, required: true },
});

const PatientSchema: Schema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  medicalHistory: { type: [String], required: true },
  treatments: { type: [String], required: true },
  labResults: { type: [LabResultSchema], required: false },
});

export default mongoose.model<IPatient>("Patient", PatientSchema);
