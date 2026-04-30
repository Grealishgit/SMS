import twilio from 'twilio';

export const voiceVerification = (req, res) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT2_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN2;
        const client = twilio(accountSid, authToken);

        client.verify.v2.services(process.env.VERIFY_SERVICE_SID)
            .verificationChecks
            .create({ to: '+254742636835', code: '356168' })
            .then(verification_check => {
                res.status(200).json({
                    message: 'Voice verification successful',
                    success: true,
                    status: verification_check.status
                });
                console.log(verification_check);
            })
    } catch (error) {
        console.error('Error in voice verification:', error);
        res.status(500).json({
            message: 'Failed to perform voice verification',
            success: false,
            error: error.message
        });
        return;

    }
}