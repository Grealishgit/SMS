import NodeCache from "node-cache";
import crypto from "crypto";

const otpCache = new NodeCache({ stdTTL: 300 }); // Store OTPs for 5 minutes

// Function to generate a 6-digit OTP
export const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Function to store OTP
export const storeOTP = (phone, otp) => {
    otpCache.set(phone, otp);
};

// Function to verify OTP
export const verifyOTP = (phone, userOTP) => {
    const storedOTP = otpCache.get(phone);
    if (!storedOTP) return { success: false, message: "OTP expired or not found" };
    if (storedOTP !== userOTP) return { success: false, message: "Invalid OTP" };

    otpCache.del(phone); // Remove OTP after successful verification
    return { success: true, message: "OTP verified successfully" };
};
