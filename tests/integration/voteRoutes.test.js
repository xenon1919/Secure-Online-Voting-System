const request = require("supertest");
const app = require("../../backend/app");
const mongoose = require("mongoose");
const User = require("../../backend/models/User");
const Candidate = require("../../backend/models/Candidate");

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({ email: "voter@example.com" });

  const user = await request(app).post("/api/auth/register").send({
    name: "Voter",
    email: "voter@example.com",
    password: "test1234",
    aadhaar: "123456789123",
    city: "City",
    state: "State",
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "voter@example.com",
    password: "test1234",
  });

  token = login.body.token;

  await Candidate.create({
    name: "Candidate 1",
    party: "Party A",
    symbol: "symbol.png",
  });
});

afterAll(async () => {
  await User.deleteMany({ email: "voter@example.com" });
  await Candidate.deleteMany({});
  await mongoose.connection.close();
});

describe("Voting Routes", () => {
  it("should fetch all candidates", async () => {
    const res = await request(app).get("/api/vote/candidates");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should allow a user to vote", async () => {
    const candidates = await request(app).get("/api/vote/candidates");
    const candidateId = candidates.body[0]._id;

    const res = await request(app)
      .post("/api/vote/cast")
      .set("Authorization", `Bearer ${token}`)
      .send({ candidateId });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Vote cast successfully/i);
  });
});
