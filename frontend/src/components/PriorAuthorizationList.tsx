import React, { useEffect, useState } from "react";
import {
  fetchPriorAuthorizations,
  updateAuthorizationStatus,
} from "../services/api";

interface PriorAuthorization {
  _id: string;
  patientId: string;
  treatmentType: string;
  insurancePlan: string;
  dateOfService: string;
  diagnosisCode: string;
  doctorNotes: string;
  status: "Pending" | "Approved" | "Denied";
}

const PatientsPerPage = 10;

const PriorAuthorizationsList: React.FC = () => {
  const [authorizations, setAuthorizations] = useState<PriorAuthorization[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPatients, setTotalPatients] = useState<number>(0);

  const fetchAuthorizationsData = async (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    try {
      const response = await fetchPriorAuthorizations(offset, limit);
      setAuthorizations(response.data);
      setTotalPatients(response.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthorizationsData(page, PatientsPerPage);
  }, [page]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredAuthorizations = authorizations.filter(
    (auth) =>
      auth.patientId.toLowerCase().includes(search.toLowerCase()) ||
      auth.treatmentType.toLowerCase().includes(search.toLowerCase()) ||
      auth.insurancePlan.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(totalPatients / PatientsPerPage);
  const currentAuthorizations = filteredAuthorizations.slice(
    0,
    PatientsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getPaginationNumbers = () => {
    const pageNumbers: number[] = [];
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

  const handleStatusChange = async (
    id: string,
    newStatus: "Pending" | "Approved" | "Denied"
  ) => {
    try {
      await updateAuthorizationStatus(id, newStatus);
      fetchAuthorizationsData(page, PatientsPerPage);
    } catch (err: any) {
      setError("Failed to update status.");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        PRIOR AUTHORIZATIONS
      </h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full"
      />
      {currentAuthorizations.length === 0 ? (
        <p className="text-center text-gray-500">
          No prior authorizations found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 border text-center">Patient ID</th>
                <th className="py-3 px-4 border text-center">Treatment Type</th>
                <th className="py-3 px-4 border text-center">Insurance Plan</th>
                <th className="py-3 px-4 border text-center">
                  Date of Service
                </th>
                <th className="py-3 px-4 border text-center">Diagnosis Code</th>
                <th className="py-3 px-4 border text-center">Doctor's Notes</th>
                <th className="py-3 px-4 border text-center">Status</th>
                <th className="py-3 px-4 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAuthorizations.map((data) => (
                <tr
                  key={data._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-4 border text-center font-bold">
                    {data.patientId}
                  </td>
                  <td className="py-2 px-4 border">{data.treatmentType}</td>
                  <td className="py-2 px-4 border">{data.insurancePlan}</td>
                  <td className="py-2 px-4 border text-center">
                    {formatDate(data.dateOfService)}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {data.diagnosisCode}
                  </td>
                  <td className="py-2 px-4 border">{data.doctorNotes}</td>
                  <td className="py-2 px-4 border text-center">
                    <span
                      className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                        data.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : data.status === "Denied"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {data.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <select
                      value={data.status}
                      onChange={(e) =>
                        handleStatusChange(
                          data._id,
                          e.target.value as "Pending" | "Approved" | "Denied"
                        )
                      }
                      className="border rounded p-1 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Denied">Denied</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

export default PriorAuthorizationsList;
