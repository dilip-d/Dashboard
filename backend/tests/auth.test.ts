import request from "supertest";
import app from "../app"; // assuming your express app is exported from app.ts

describe("Authentication API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should reject unauthorized access", async () => {
    const res = await request(app).post("/api/authorizations").send({
      patientId: "12345",
      treatment: "Surgery",
      status: "pending",
    });
    expect(res.statusCode).toEqual(401);
  });
});
