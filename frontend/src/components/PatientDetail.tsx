import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPatientById } from "../services/api";

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
  medicalHistory: string[];
  treatments: string[];
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

  if (loading) return <p>Loading patient details...</p>;
  if (error) return <p>Error fetching patient details: {error}</p>;
  if (!patient) return <p>No patient details found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
      <p>
        <strong>Name:</strong> {patient.name}
      </p>
      <p>
        <strong>Age:</strong> {patient.age}
      </p>
      <p>
        <strong>Condition:</strong> {patient.condition}
      </p>
      <div>
        <h3 className="text-xl mt-4">Medical History</h3>
        <ul>
          {patient.medicalHistory.map((history, i) => (
            <li key={i}>{history}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl mt-4">Treatments</h3>
        <ul>
          {patient.treatments.map((treatment, i) => (
            <li key={i}>{treatment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetail;
