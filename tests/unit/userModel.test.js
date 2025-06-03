const mongoose = require("mongoose");
const User = require("../../backend/models/User");

describe("User Model", () => {
  it("should fail if required fields are missing", async () => {
    const user = new User({ name: "Test" }); // missing email and aadhaar
    let err;
    try {
      await user.validate();
    } catch (e) {
      err = e;
    }
    expect(err.errors.email).toBeDefined();
    expect(err.errors.aadhaar).toBeDefined();
  });

  it("should pass with all required fields", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "secret",
      aadhaar: "123456789012",
    });
    await expect(user.validate()).resolves.toBeUndefined();
  });
});
