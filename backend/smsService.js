import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendSMS = async (mobile, message) => {
    try {
        const API_URL = "https://sms.textsms.co.ke/api/services/sendsms/";

        const payload = {
            apikey: process.env.TEXTSMS_API_KEY,
            partnerID: Number(process.env.TEXTSMS_PARTNER_ID),
            shortcode: process.env.TEXTSMS_SHORTCODE.trim(),
            message: message,
            mobile: 254742636835
        };

        if (isNaN(payload.partnerID)) {
            throw new Error("Invalid PartnerID: It must be a number.");
        }

        if (payload.shortcode.length < 2 || payload.shortcode.length > 11) {
            throw new Error("Invalid Shortcode: It must be between 2 and 11 characters.");
        }

        const response = await axios.post(API_URL, payload, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("SMS Sent:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error sending SMS:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export default sendSMS;
