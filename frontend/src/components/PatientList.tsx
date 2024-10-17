import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatients } from "../services/api";

interface Patient {
  _id: string;
  name: string;
  age: number;
  condition: string;
}

const PatientsPerPage = 10;

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState<number>(1);
  const [totalPatients, setTotalPatients] = useState<number>(0);
  const navigate = useNavigate();

  const fetchPatientsData = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    try {
      const response = await fetchPatients(offset, limit);
      setPatients(response.data);
      setTotalPatients(response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientsData(page, PatientsPerPage);
  }, [page]);

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>Error fetching patients: {error}</p>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(totalPatients / PatientsPerPage);
  const currentPatients = filteredPatients.slice(0, PatientsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getPaginationNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;

    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const paginationNumbers = getPaginationNumbers();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Patient List</h2>
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
            {currentPatients?.map((patient) => (
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
                    onClick={() => navigate(`/patient/${patient?._id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={`mx-1 px-3 py-1 border rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition`}
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`mx-1 px-3 py-1 border rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition`}
        >
          {"<"}
        </button>
        {paginationNumbers.map((number) => (
          <button
            key={number}
            className={`mx-1 px-3 py-1 border rounded ${
              page === number
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-500 hover:bg-blue-100"
            } transition`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`mx-1 px-3 py-1 border rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition`}
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className={`mx-1 px-3 py-1 border rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition`}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default PatientList;
