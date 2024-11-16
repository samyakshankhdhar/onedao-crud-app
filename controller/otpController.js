// controllers/otpController.js
const crypto = require('crypto');

const otpStorage = {};

// Generate OTP function
exports.generateOTP = async (req, res) => {
    console.log('generateOTP called');
    const { email } = req.body; // Get email from request body

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const OTP_EXPIRY_DURATION = 5 * 60 * 1000;
        const otp = crypto.randomInt(100000, 999999).toString();  // Generate a 6-digit OTP

        // Send OTP in the response (In a real scenario, you would send the OTP to the user's email)
        console.log(`OTP for user ${email}: ${otp}`);  // For demonstration purposes, we log the OTP

        // Hash the OTP for secure storage
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    const expiryTime = Date.now() + OTP_EXPIRY_DURATION;

    // Store the hashed OTP in memory with email as the key
    otpStorage[email] = { hashedOtp, expiryTime };

    setTimeout(() => {
        delete otpStorage[email];
    }, OTP_EXPIRY_DURATION);

        // Send OTP in the response body
        return otp;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating OTP' });
    }
};

// Verify OTP function
exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        // Retrieve hashed OTP from memory
        const otpDetails = otpStorage[email];

        if (!otpDetails) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        const { hashedOtp, expiryTime } = otpDetails;

        if (Date.now() > expiryTime) {
            delete otpStorage[email]; // Clean up expired OTP
            return res.status(400).json({ message: 'OTP has expired.' });
        }


        if (!hashedOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Hash the provided OTP and compare with the stored hash
        if (Date.now() > expiryTime) {
            delete otpStorage[email]; // Clean up expired OTP
            return res.status(400).json({ message: 'OTP has expired' });
        }

        const hashedInputOtp = crypto.createHash('sha256').update(otp).digest('hex');
        if (hashedOtp !== hashedInputOtp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        

        // OTP is valid, remove it from memory
        delete otpStorage[email];

        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
};
