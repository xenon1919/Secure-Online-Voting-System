const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../backend/config/keys");

describe("JWT Token Logic", () => {
  it("should sign and verify a token", () => {
    const payload = { _id: "123", name: "User" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    const decoded = jwt.verify(token, JWT_SECRET);
    expect(decoded._id).toBe("123");
    expect(decoded.name).toBe("User");
  });

  it("should throw error on invalid token", () => {
    expect(() => jwt.verify("invalid.token", JWT_SECRET)).toThrow();
  });
});
