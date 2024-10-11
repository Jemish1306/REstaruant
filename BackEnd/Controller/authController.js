const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/generateToken');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, country, state, city, restaurant, password } = req.body;
  
    try {
      // Check if user already exists
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create new user instance
      user = new User({ firstName, lastName, email, phoneNumber, country, state, city, restaurant, password });
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save user to database
      await user.save();
      console.log("login sussfully")
  
      // Create JWT token
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '30d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      console.log("user are not crateednd")
    }
    console.log('JWT_SECRET:', process.env.JWT_SECRET);     
    // it is create SECRET key 
  const crypto = require('crypto');
  const secret = crypto.randomBytes(64).toString('hex');
  console.log(secret);

  };


  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ msg:'Invalid credentials' });
      }
  console.log("login susss fullu")
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
      console.log("backend error")
      
    }
  };


  
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_SECRET,
      { expiresIn: '30m' }
    );

    // Send email with reset link
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Link',
      html: `<p>Please click the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    };

    await sendEmail(emailData);

    res.json({ msg: 'Password reset email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken) {
    return res.status(400).json({ msg: 'Missing reset token' });
  }

  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_RESET_SECRET);
    let user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ msg: 'Password reset successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
