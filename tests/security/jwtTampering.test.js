const request = require("supertest");
const app = require("../../backend/app");

describe("Security: JWT Tampering", () => {
  it("should reject tampered JWT", async () => {
    const fakeToken = "Bearer invalid.token.value";

    const res = await request(app)
      .post("/api/vote")
      .set("Authorization", fakeToken)
      .send({ candidateId: "someid" });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Invalid token/i);
  });
});
