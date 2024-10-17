import { Request, Response, NextFunction } from "express";
import Patient from "../models/Patient";

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset = 0, limit = 10 } = req.query;
    const patients = await Patient.find()
      .skip(Number(offset))
      .limit(Number(limit));

    const totalPatients = await Patient.countDocuments();

    res.json({
      total: totalPatients,
      data: patients,
    });
  } catch (error) {
    next({ message: "Error fetching patients.", error });
  }
};

export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    next({ message: "Error fetching patient", error });
  }
};
