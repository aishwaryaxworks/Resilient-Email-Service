export default class MockEmailProviderA {
    async sendEmail(email: string, subject: string, body: string): Promise<boolean> {
      console.log(`MockEmailProviderA: Sending email to ${email}`);
      // Simulate success or failure randomly
      const isSuccess = Math.random() > 0.3; // 70% success rate
      if (isSuccess) {
        console.log("MockEmailProviderA: Email sent successfully!");
        return true;
      } else {
        console.error("MockEmailProviderA: Failed to send email.");
        throw new Error("ProviderA Failure");
      }
    }
  }
  