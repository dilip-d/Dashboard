import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatients } from "../services/api";

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
}

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>Error fetching patients: {error}</p>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Patient List</h2>
      <input
        type="text"
        placeholder="Search patients..."
        className="p-2 mb-4 border rounded"
        value={search}
        onChange={handleSearch}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Age
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Condition
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients?.map((patient) => (
              <tr key={patient._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {patient.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {patient.age}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {patient.condition}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/patient/${patient._id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
