import { render, screen, fireEvent } from "@testing-library/react";
import PatientList from "./PatientList";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const patients = [
  { _id: "1", name: "John Doe", age: 30, condition: "Healthy" },
  { _id: "2", name: "Jane Doe", age: 28, condition: "Injured" },
];

describe("PatientList Component", () => {
  it("renders patient list", async () => {
    mockedAxios.get.mockResolvedValue({ data: patients });

    render(
      <BrowserRouter>
        <PatientList />
      </BrowserRouter>
    );

    const items = await screen.findAllByText(/Doe/i);
    expect(items).toHaveLength(2);
  });

  it("filters patients based on search", async () => {
    mockedAxios.get.mockResolvedValue({ data: patients });

    render(
      <BrowserRouter>
        <PatientList />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search patients/i), {
      target: { value: "Jane" },
    });

    const items = await screen.findAllByText(/Jane Doe/i);
    expect(items).toHaveLength(1);
  });
});
