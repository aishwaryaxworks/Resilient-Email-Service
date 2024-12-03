import fs from "fs";
import path from "path";

export default class Logger {
  private logFile: string;

  constructor() {
    this.logFile = path.join(__dirname, "../logs/email-service.log");
    if (!fs.existsSync(this.logFile)) {
      fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
      fs.writeFileSync(this.logFile, "");
    }
  }

  log(message: string) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFile, `[${timestamp}] ${message}\n`);
    console.log(`[LOG]: ${message}`);
  }

  error(message: string) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(this.logFile, `[${timestamp}] ERROR: ${message}\n`);
    console.error(`[ERROR]: ${message}`);
  }
}
