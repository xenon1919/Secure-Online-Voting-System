const request = require("supertest");
const app = require("../../backend/app");

describe("Security: Injection Attempts", () => {
  it("should reject suspicious login inputs", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "' OR '1'='1",
      password: "anything",
    });

    expect(res.statusCode).toBe(401); // Or 400 depending on validation
  });
});
