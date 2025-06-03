const bcrypt = require("bcrypt");

describe("Password Hashing", () => {
  it("should hash and compare correctly", async () => {
    const password = "secure123";
    const hash = await bcrypt.hash(password, 10);
    const isMatch = await bcrypt.compare(password, hash);
    expect(isMatch).toBe(true);
  });
});
