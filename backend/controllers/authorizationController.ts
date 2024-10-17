import { Request, Response } from "express";
import Authorization from "../models/Authorization";

export const createAuthorization = async (req: Request, res: Response) => {
  const {
    patientId,
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
    doctorNotes,
  } = req.body;

  try {
    const newAuth = new Authorization({
      patientId,
      treatmentType,
      insurancePlan,
      dateOfService,
      diagnosisCode,
      doctorNotes,
    });
    await newAuth.save();
    res.status(201).json(newAuth);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating prior authorization request." });
  }
};

export const getAllAuthorizations = async (req: Request, res: Response) => {
  try {
    const authorizations = await Authorization.find();
    res.json(authorizations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving authorization requests." });
  }
};
