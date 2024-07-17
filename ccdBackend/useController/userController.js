
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const { createUser, findUserByEnrollmentNumber, findUserByEmail, findUserByRegistrationNumber,  updateUserResetToken, findUserByResetToken, updateUserPassword } = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function signUp(req, res) {
  try {
    const { name, email, enrollmentNumber, registrationNumber, password } = req.body;

    // Check if the email already exists
    const existingEmailUser = await findUserByEmail(email);
    if (existingEmailUser) {
      return res.status(400).send('Email already in use');
    }

    // Check if the enrollment number already exists
    const existingEnrollmentUser = await findUserByEnrollmentNumber(enrollmentNumber);
    if (existingEnrollmentUser) {
      return res.status(400).send('Enrollment number already in use');
    }

    // Check if the registration number already exists
    const existingRegistrationUser = await findUserByRegistrationNumber(registrationNumber);
    if (existingRegistrationUser) {
      return res.status(400).send('Registration number already in use');
    }

    const userId = await createUser({ name, email, enrollmentNumber, registrationNumber, password });

    res.status(201).send(`User created with ID: ${userId}`);
  } catch (err) {
    console.error('Failed to create user:', err);
    res.status(500).send('Failed to create user');
  }
}

async function login(req, res) {
  try {
    const { enrollmentNumber, password } = req.body;
    const user = await findUserByEnrollmentNumber(enrollmentNumber);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Incorrect password');
    }

    // Create a token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (err) {
    console.error('Failed to login:', err);
    res.status(500).send('Failed to login');
  }
}

// Transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    await updateUserResetToken(user._id, resetToken, resetTokenExpiry);

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset',
      text: `You requested for a password reset. Click the following link to reset your password: ${resetLink}`,
    });

    res.status(200).send('Password reset link sent');
  } catch (err) {
    console.error('Failed to request password reset:', err);
    res.status(500).send('Failed to request password reset');
  }
}

async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await findUserByResetToken(token);

    if (!user || user.resetTokenExpiry < Date.now()) {
      return res.status(400).send('Invalid or expired token');
    }

    await updateUserPassword(user._id, newPassword);

    res.status(200).send('Password reset successful');
  } catch (err) {
    console.error('Failed to reset password:', err);
    res.status(500).send('Failed to reset password');
  }
}

module.exports = { signUp, login, requestPasswordReset, resetPassword };
