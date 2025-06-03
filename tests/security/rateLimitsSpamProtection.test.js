const request = require("supertest");
const app = require("../../backend/app");

describe("Security: Rate Limiting", () => {
  it("should block excessive requests", async () => {
    const promises = Array.from({ length: 20 }).map(() =>
      request(app).post("/api/auth/login").send({
        email: "testuser@example.com",
        password: "wrongpassword",
      })
    );

    const results = await Promise.all(promises);
    const blocked = results.some((res) => res.statusCode === 429);

    expect(blocked).toBe(true);
  });
});
