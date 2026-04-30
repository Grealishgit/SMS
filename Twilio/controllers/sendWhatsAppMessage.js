import twilio from 'twilio';

export const sendWhatsAppMessage = (req, res) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);


    async function createMessage() {
        try {
            const message = await client.messages.create({
                body: "Your verification code is 123456",
                from: process.env.TWILIO_WHATSAPP_NUMBER,
                mediaUrl: ["https://demo.twilio.com/owl.png"],
                statusCallback: "https://hunterdev.live",
                to: "whatsapp:+254742636835",
            }); 
            res.status(200).json({
                message: 'WhatsApp Message Sent Successfully',
                success: true,
                sid: message.sid,
                body: message.body
            });
            console.log(message);
            console.log(message.sid);
            return;
        } catch (error) {
            console.error('Error sending WhatsApp message:', error);
            res.status(500).json({
                message: 'Failed to send WhatsApp message',
                success: false,
                error: error.message
            });
            return;
        }
    }
    createMessage();
}

