jest.mock("mongoose", () => {
  const originalMongoose = jest.requireActual("mongoose");
  return {
    ...originalMongoose,
    model: jest.fn().mockReturnValue({
      findById: jest.fn().mockResolvedValue({ _id: "123", name: "test user" }),
    }),
  };
});

const jwt = require("jsonwebtoken");
const requireLogin = require("../../backend/middleware/requireLogin");
const { JWT_SECRET } = require("../../backend/config/keys");

describe("requireLogin Middleware", () => {
  const mockReq = {};
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  test("should reject if no token provided", async () => {
    mockReq.headers = {};
    await requireLogin(mockReq, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "You must be logged in",
    });
  });

  test("should accept a valid admin token", async () => {
    const token = jwt.sign({ isAdmin: true }, JWT_SECRET);
    mockReq.headers = { authorization: `Bearer ${token}` };
    await requireLogin(mockReq, mockRes, next);
    expect(mockReq.user.isAdmin).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  test("should handle invalid token", async () => {
    mockReq.headers = { authorization: "Bearer invalidtoken" };
    await requireLogin(mockReq, mockRes, next);
    expect(mockRes.status).toHaveBeenCalledWith(401);
  });
});
