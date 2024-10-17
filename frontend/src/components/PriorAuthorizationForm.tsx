import React, { useState } from "react";
import { submitPriorAuthorization } from "../services/api";

interface PriorAuthorizationFormProps {
  patientId: string;
}

const PriorAuthorizationForm: React.FC<PriorAuthorizationFormProps> = ({
  patientId,
}) => {
  const [formData, setFormData] = useState({
    treatmentType: "",
    insurancePlan: "",
    dateOfService: "",
    diagnosisCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await submitPriorAuthorization({ ...formData, patientId });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Prior Authorization Request</h2>
      {error && <p>Error: {error}</p>}
      <div>
        <label>Treatment Type:</label>
        <input
          type="text"
          name="treatmentType"
          value={formData.treatmentType}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Insurance Plan:</label>
        <input
          type="text"
          name="insurancePlan"
          value={formData.insurancePlan}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date of Service:</label>
        <input
          type="date"
          name="dateOfService"
          value={formData.dateOfService}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Diagnosis Code:</label>
        <input
          type="text"
          name="diagnosisCode"
          value={formData.diagnosisCode}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default PriorAuthorizationForm;
