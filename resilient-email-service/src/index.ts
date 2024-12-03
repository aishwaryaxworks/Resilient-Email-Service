import express from "express";
import EmailService from "./EmailService";
import rateLimit from "express-rate-limit";

const app = express();
const emailService = new EmailService();

app.use(express.json());

app.post("/send-email", async (req, res) => {
    const { email, subject, body } = req.body;
    try {
      await emailService.sendEmail(email, subject, body);
      res.status(200).send("Email sent successfully!");
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(`Failed to send email: ${error.message}`);
      } else {
        res.status(500).send(`Failed to send email: ${String(error)}`);
      }
    }
  });
  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Email Service is Running!");
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  
  app.use(limiter);