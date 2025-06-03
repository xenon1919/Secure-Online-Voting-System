const request = require("supertest");
const app = require("../../backend/app");
const mongoose = require("mongoose");
const User = require("../../backend/models/User");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany({ email: "testuser@example.com" });
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      aadhaar: "123412341234",
      city: "City",
      state: "State",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Registered successfully!");
  });

  it("should login the registered user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
