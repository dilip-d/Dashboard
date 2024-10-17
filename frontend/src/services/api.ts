import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const fetchPatients = async () => {
  const response = await axios.get(`${API_URL}/patients`);
  return response.data;
};

export const fetchPatientById = async (patientId: string) => {
  const response = await axios.get(`${API_URL}/patients/${patientId}`);
  return response.data;
};

export const submitPriorAuthorization = async (data: any) => {
  const response = await axios.post(`${API_URL}/prior-authorization`, data);
  return response.data;
};
