import express from "express";
import dotenv from "dotenv";
import sendSMS from "./smsService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/send-sms", async (req, res) => {
    const { mobile, message } = req.body;

    if (!mobile || !message) {
        return res.status(400).json({ error: "Mobile number and message are required" });
    }

    try {
        const response = await sendSMS(mobile, message);
        res.status(200).json({ success: true, response });
    } catch (error) {
        res.status(500).json({ error: "Failed to send SMS", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
