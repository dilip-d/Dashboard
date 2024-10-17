import axios from "axios";

const API_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const fetchPatients = async (offset: number, limit: number) => {
  const response = await apiClient.get(
    `/patients?offset=${offset}&limit=${limit}`
  );
  return response.data;
};

export const fetchPatientById = async (patientId: string) => {
  const response = await apiClient.get(`/patients/${patientId}`);
  return response.data;
};

export const submitPriorAuthorization = async (data: any) => {
  const response = await apiClient.post("/prior-authorization", data);
  return response.data;
};
