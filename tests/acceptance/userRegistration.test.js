const request = require("supertest");
const app = require("../../backend/app");

describe("Acceptance: User Registration Flow", () => {
  it("should register a user and login successfully", async () => {
    const userData = {
      name: "Test User",
      email: "testuser1@example.com",
      password: "password123",
      aadhaar: "123456789012",
      city: "Hyderabad",
      state: "Telangana",
    };

    const registerRes = await request(app)
      .post("/api/auth/register")
      .send(userData);
    expect(registerRes.statusCode).toBe(200);
    expect(registerRes.body.message).toMatch(/Registered successfully/i);

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: userData.email, password: userData.password });
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeDefined();
  });
});
