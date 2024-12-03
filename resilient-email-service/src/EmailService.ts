import MockEmailProviderA from "./MockEmailProviderA";
import MockEmailProviderB from "./MockEmailProviderB";
import Logger from "./Logger";

export default class EmailService {
  private providerA: MockEmailProviderA;
  private providerB: MockEmailProviderB;
  private retryCount: number;
  private backoffInterval: number;
  private logger: Logger;

  constructor() {
    this.providerA = new MockEmailProviderA();
    this.providerB = new MockEmailProviderB();
    this.retryCount = 3; // Retry up to 3 times
    this.backoffInterval = 1000; // Start with 1-second interval
    this.logger = new Logger();
  }

  async sendEmail(email: string, subject: string, body: string): Promise<boolean> {
    let attempt = 0;
    let lastError: Error | null = null;
  
    for (let provider of [this.providerA, this.providerB]) {
      while (attempt < this.retryCount) {
        try {
            this.logger.log(`Attempt ${attempt + 1}: Using ${provider.constructor.name}`);
          const isSent = await provider.sendEmail(email, subject, body);
          if (isSent) return true;
        } catch (error) {
            if (error instanceof Error) {
                lastError = error;
                this.logger.error(`Error: ${error.message}`);
              } else {
                lastError = new Error(String(error));
                this.logger.error(`Error: ${String(error)}`);
              }              
          attempt++;
          await this.delay(this.backoffInterval * Math.pow(2, attempt)); // Exponential backoff
        }
      }
      console.log(`Switching to fallback provider.`);
      attempt = 0; // Reset attempts for the next provider
    }
  
    console.error("All providers failed.");
    throw lastError || new Error("Unknown error");
  }
  

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
