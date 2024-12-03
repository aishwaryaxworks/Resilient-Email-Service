import EmailService from "../EmailService";

describe("EmailService", () => {
  let emailService: EmailService;

  beforeEach(() => {
    emailService = new EmailService();
  });

  it("should send email successfully", async () => {
    const result = await emailService.sendEmail(
      "test@example.com",
      "Test Subject",
      "Test Body"
    );
    expect(result).toBe(true);
  });

  it("should throw error if all providers fail", async () => {
    jest.spyOn(global.Math, "random").mockReturnValue(1); // Force all providers to fail
    await expect(
      emailService.sendEmail("test@example.com", "Test Subject", "Test Body")
    ).rejects.toThrow();
  });
});
