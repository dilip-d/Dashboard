import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPatientById } from "../services/api";

interface LabResult {
  testName: string;
  result: string;
  date: string;
  normalRange: string;
}

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  medicalHistory: string[];
  treatments: string[];
  labResults: LabResult[];
}

const PatientDetail: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPatientDetails = async () => {
      if (!id) {
        setError("Patient ID is required.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchPatientById(id);
        setPatient(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPatientDetails();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading patient details...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">
        Error fetching patient details: {error}
      </p>
    );
  if (!patient)
    return (
      <p className="text-center text-gray-500">No patient details found.</p>
    );

  return (
    <div className="w-full p-8 bg-gradient-to-r from-blue-100 to-blue-300">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Patient Details
      </h2>
      <div className="mb-6 p-6 bg-white rounded-lg shadow-md border-l-4 border-blue-500">
        <p className="text-lg mb-2">
          <strong className="text-gray-700">Name:</strong> {patient.name}
        </p>
        <p className="text-lg mb-2">
          <strong className="text-gray-700">Age:</strong> {patient.age}
        </p>
        <p className="text-lg mb-4">
          <strong className="text-gray-700">Condition:</strong>{" "}
          {patient.condition}
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-3xl font-semibold mb-2 text-blue-600">
          Medical History
        </h3>
        <ul className="list-disc list-inside pl-5">
          {patient.medicalHistory.map((history, i) => (
            <li key={i} className="text-lg text-gray-800 mb-1">
              {history}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-3xl font-semibold mb-2 text-blue-600">
          Treatments
        </h3>
        <ul className="list-disc list-inside pl-5">
          {patient.treatments.map((treatment, i) => (
            <li key={i} className="text-lg text-gray-800 mb-1">
              {treatment}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-3xl font-semibold mb-2 text-blue-600">
          Lab Results
        </h3>
        <ul className="list-disc list-inside pl-5">
          {patient.labResults.length > 0 ? (
            patient.labResults.map((result, i) => (
              <li key={i} className="text-lg text-gray-800 mb-1">
                <strong>{result.testName}</strong>: {result.result} (Date:{" "}
                {result.date}, Normal Range: {result.normalRange})
              </li>
            ))
          ) : (
            <li className="text-lg text-gray-500">No lab results available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetail;
