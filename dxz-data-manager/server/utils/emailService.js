const nodemailer = require('nodemailer');

/**
 * Email Service for DXZ Data Manager
 * Handles email verification and password reset emails
 */

// Email configuration
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true' || false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};

// Create transporter
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('Email service not configured. Set SMTP_USER and SMTP_PASS environment variables.');
    return null;
  }

  return nodemailer.createTransporter(emailConfig);
};

// Send email verification
const sendVerificationEmail = async (email, username, verificationToken) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    throw new Error('Email service not configured');
  }

  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;

  const mailOptions = {
    from: {
      name: 'DXZ Data Manager',
      address: process.env.SMTP_USER
    },
    to: email,
    subject: 'Verify Your Email Address - DXZ Data Manager',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
          }
          .title {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }
          .content {
            font-size: 16px;
            margin-bottom: 30px;
          }
          .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #667eea;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .btn:hover {
            background-color: #5a67d8;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
          }
          .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #856404;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">DXZ Data Manager</div>
            <h1 class="title">Verify Your Email Address</h1>
          </div>
          
          <div class="content">
            <p>Hello <strong>${username}</strong>,</p>
            
            <p>Thank you for registering with DXZ Data Manager! To complete your account setup and start managing your data securely, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="btn">Verify Email Address</a>
            </div>
            
            <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
            
            <div class="warning">
              <strong>Important:</strong> This verification link will expire in 24 hours for security reasons. If you don't verify your email within this time, you'll need to register again.
            </div>
            
            <p>If you didn't create an account with DXZ Data Manager, please ignore this email.</p>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The DXZ Data Manager Team</p>
            <p style="font-size: 12px; margin-top: 20px;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${username},

      Thank you for registering with DXZ Data Manager!

      To verify your email address, please visit: ${verificationUrl}

      This link will expire in 24 hours.

      If you didn't create an account with us, please ignore this email.

      Best regards,
      The DXZ Data Manager Team
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// Send password reset email
const sendPasswordResetEmail = async (email, username, resetToken) => {
  const transporter = createTransporter();
  
  if (!transporter) {
    throw new Error('Email service not configured');
  }

  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

  const mailOptions = {
    from: {
      name: 'DXZ Data Manager',
      address: process.env.SMTP_USER
    },
    to: email,
    subject: 'Password Reset Request - DXZ Data Manager',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 28px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 10px;
          }
          .title {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }
          .content {
            font-size: 16px;
            margin-bottom: 30px;
          }
          .btn {
            display: inline-block;
            padding: 12px 30px;
            background-color: #e53e3e;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .btn:hover {
            background-color: #c53030;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
          }
          .warning {
            background-color: #fed7d7;
            border: 1px solid #feb2b2;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            color: #742a2a;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">DXZ Data Manager</div>
            <h1 class="title">Password Reset Request</h1>
          </div>
          
          <div class="content">
            <p>Hello <strong>${username}</strong>,</p>
            
            <p>We received a request to reset your password for your DXZ Data Manager account. If you made this request, click the button below to reset your password:</p>
            
            <div style="text-align: center;">
              <a href="${resetUrl}" class="btn">Reset Password</a>
            </div>
            
            <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
            <p style="word-break: break-all; color: #e53e3e;">${resetUrl}</p>
            
            <div class="warning">
              <strong>Security Notice:</strong> This password reset link will expire in 24 hours for security reasons. If you don't reset your password within this time, you'll need to request a new reset link.
            </div>
            
            <p><strong>If you didn't request a password reset:</strong></p>
            <ul>
              <li>Please ignore this email</li>
              <li>Your password will remain unchanged</li>
              <li>Consider changing your password if you suspect unauthorized access</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The DXZ Data Manager Team</p>
            <p style="font-size: 12px; margin-top: 20px;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Hello ${username},

      We received a request to reset your password for your DXZ Data Manager account.

      To reset your password, please visit: ${resetUrl}

      This link will expire in 24 hours.

      If you didn't request a password reset, please ignore this email.

      Best regards,
      The DXZ Data Manager Team
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

// Test email configuration
const testEmailConfig = async () => {
  const transporter = createTransporter();
  
  if (!transporter) {
    return { success: false, message: 'Email service not configured' };
  }

  try {
    await transporter.verify();
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return { success: false, message: 'Email configuration is invalid', error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  testEmailConfig
};