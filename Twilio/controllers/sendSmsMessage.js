import twilio from "twilio";

export const sendSmsMessage = (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    async function createMessage() {
        try {
            const message = await client.messages.create({
                body: "Hi there!!! This is a test SMS from Twilio.",
                from: process.env.TWILIO_SMS_NUMBER,
                to: "+254742636835",
            });

            res.status(200).json({
                message: 'SMS Message Sent Successfully',
                success: true,
                sid: message.sid,
                body: message.body
            });
            console.log(message);
            console.log(message.sid);
            return;
        } catch (error) {
            console.error("Error sending SMS message:", error);
            res.status(500).json({
                message: 'Failed to send SMS  message',
                success: false,
                error: error.message
            });
            return;

        }


    }

    createMessage();

}