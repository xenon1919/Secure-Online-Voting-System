const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

describe("OTP Utility", () => {
  it("should generate a 6-digit OTP", () => {
    const otp = generateOTP();
    expect(otp).toBeGreaterThanOrEqual(100000);
    expect(otp).toBeLessThanOrEqual(999999);
  });
});
