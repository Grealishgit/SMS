import express from "express";
import dotenv from "dotenv";
import { generateOTP, storeOTP, verifyOTP } from "./otpService.js";
import { sendOTP } from "./smsService.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Route to send OTP
app.post("/send-otp", async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ error: "Mobile number is required" });
    }

    const otp = generateOTP();
    storeOTP(mobile, otp);

    try {
        await sendOTP(mobile, otp);
        res.status(200).json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP", details: error.message });
    }
});

// Route to verify OTP
app.post("/verify-otp", (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
        return res.status(400).json({ error: "Mobile number and OTP are required" });
    }

    const verificationResult = verifyOTP(mobile, otp);
    res.status(200).json(verificationResult);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
