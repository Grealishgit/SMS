import twilio from 'twilio';

export const verifyPhone = (req, res) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT2_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN2;
        const client = twilio(accountSid, authToken);

        client.verify.v2.services(process.env.VERIFY_SERVICE_SID)
            .verifications
            .create({ to: '+254742636835', channel: 'sms' })
            .then(verification => {
                res.status(200).json({
                    message: 'Verification code sent',
                    success: true,
                    sid: verification.sid
                });
            })
            .catch(error => {
                console.error('Error sending verification code:', error);
                res.status(500).json({
                    message: 'Failed to send verification code',
                    success: false,
                    error: error.message
                });
            });
    } catch (error) {
        console.error('Error verifying phone number:', error);
        res.status(500).json({
            message: 'Failed to verify phone number',
            success: false,
            error: error.message
        });
        return;

    }
}