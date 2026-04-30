import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const sendOTP = async (mobile, otp) => {
    try {
        const API_URL = "https://sms.textsms.co.ke/api/services/sendsms/";
        const message = `Your OTP code is: ${otp}. It expires in 5 minutes.`;

        const payload = {
            apikey: process.env.TEXTSMS_API_KEY,
            partnerID: Number(process.env.TEXTSMS_PARTNER_ID),
            shortcode: process.env.TEXTSMS_SHORTCODE.trim(),
            message: message,
            mobile: mobile
        };

        const response = await axios.post(API_URL, payload, {
            headers: { "Content-Type": "application/json" }
        });

        console.log(`OTP Sent to ${mobile}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error.response ? error.response.data : error.message);
        throw error;
    }
};
