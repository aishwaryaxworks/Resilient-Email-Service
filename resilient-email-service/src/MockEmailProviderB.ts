export default class MockEmailProviderB {
    async sendEmail(email: string, subject: string, body: string): Promise<boolean> {
      console.log(`MockEmailProviderB: Sending email to ${email}`);
      // Simulate success or failure randomly
      const isSuccess = Math.random() > 0.5; // 50% success rate
      if (isSuccess) {
        console.log("MockEmailProviderB: Email sent successfully!");
        return true;
      } else {
        console.error("MockEmailProviderB: Failed to send email.");
        throw new Error("ProviderB Failure");
      }
    }
  }
  