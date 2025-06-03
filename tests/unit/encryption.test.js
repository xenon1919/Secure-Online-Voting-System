const { encryptData, decryptData } = require("../../backend/utils/encryption");

describe("Encryption Utils", () => {
  const sampleData = { name: "Rishi", email: "rishi@example.com" };

  it("should encrypt data into a string", () => {
    const encrypted = encryptData(sampleData);
    expect(typeof encrypted).toBe("string");
    expect(encrypted).not.toBe(JSON.stringify(sampleData));
  });

  it("should decrypt data correctly", () => {
    const encrypted = encryptData(sampleData);
    const decrypted = decryptData(encrypted);
    expect(decrypted).toEqual(sampleData);
  });

  it("should throw an error on invalid ciphertext", () => {
    expect(() => decryptData("invalid_ciphertext")).toThrow();
  });
});
