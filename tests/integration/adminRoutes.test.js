const request = require("supertest");
const app = require("../../backend/app");
const mongoose = require("mongoose");

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const login = await request(app).post("/api/auth/login").send({
    email: "admin@voting.com",
    password: "admin123",
  });

  adminToken = login.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Admin Routes", () => {
  it("should allow admin to view election results", async () => {
    const res = await request(app)
      .get("/api/admin/results")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("results");
  });

  it("should allow admin to list all voters", async () => {
    const res = await request(app)
      .get("/api/admin/voters")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.voters)).toBe(true);
  });
});
