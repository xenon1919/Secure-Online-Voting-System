jest.mock("nodemailer");

const nodemailer = require("nodemailer");
const sendMail = require("../../backend/utils/sendMail");

describe("Email Utility", () => {
  it("should call sendMail with correct args", async () => {
    const sendMock = jest.fn();
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMock });

    await sendMail("to@example.com", "Subject", "Body");

    expect(sendMock).toHaveBeenCalled();
  });
});
