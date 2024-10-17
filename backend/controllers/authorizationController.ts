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

export const getAuthorizationByPatientId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const authorizations = await Authorization.find({ patientId: id });

    res.json(authorizations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving authorization request." });
  }
};

export const getAllAuthorizations = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;
    const authorizations = await Authorization.find()
      .skip(Number(offset))
      .limit(Number(limit));

    const totalPatients = await Authorization.countDocuments();

    res.json({
      total: totalPatients,
      data: authorizations,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving authorization requests." });
  }
};

export const updateAuthorizationStatus = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("id, sta", id, status);

  try {
    const authorization = await Authorization.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(authorization);
  } catch (error) {
    res.status(500).json({ message: "Error updating authorization status." });
  }
};
