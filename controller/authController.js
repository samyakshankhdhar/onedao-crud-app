const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../utils/jwtUtils');
const { generateOTP } = require('../controller/otpController');

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    console.log(user.dataValues.password);
    
    const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register User
exports.register = async (req, res) => {
try {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
  }

  const otp = await generateOTP({ body: { email } }, res);

    const newUser = await User.create({ name, email, password });
    return res.status(201).json({
        message: 'User created successfully.',
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        },
        otp: otp, // OTP sent to the client (For demonstration purposes only)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
