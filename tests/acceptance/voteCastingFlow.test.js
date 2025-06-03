const request = require("supertest");
const app = require("../../backend/app");

describe("Acceptance: Voting Flow", () => {
  let token;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "testuser1@example.com", password: "password123" });

    token = loginRes.body.token;
  });

  it("should fetch candidates and vote", async () => {
    const candidateRes = await request(app).get("/api/candidates");
    expect(candidateRes.statusCode).toBe(200);

    const candidateId = candidateRes.body[0]?._id;
    expect(candidateId).toBeDefined();

    const voteRes = await request(app)
      .post("/api/vote")
      .set("Authorization", `Bearer ${token}`)
      .send({ candidateId });

    expect(voteRes.statusCode).toBe(200);
    expect(voteRes.body.message).toMatch(/Vote cast successfully/i);
  });
});
