/**
 * PragatiPath — Centralized Email Service
 * Handles transactional emails (Welcome notification, secure password reset).
 * Uses Nodemailer with SMTP credentials loaded from environment variables.
 */
const nodemailer = require('nodemailer');

function maskEmail(email) {
  if (!email || typeof email !== 'string') return '***';
  const parts = email.split('@');
  if (parts.length !== 2) return '***';
  const user = parts[0];
  const domain = parts[1];
  const maskedUser = user.length <= 2 ? user[0] + '***' : user[0] + '***' + user[user.length - 1];
  return `${maskedUser}@${domain}`;
}

class EmailService {
  constructor() {
    this.transporter = null;
    this.fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'pragatipath6@gmail.com';
    this.initTransporter();
  }

  initTransporter() {
    const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
    const user = process.env.EMAIL_USER || 'pragatipath6@gmail.com';
    const pass = process.env.EMAIL_PASSWORD;

    if (pass && pass !== 'your_email_password_or_app_password') {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
      });
      console.log(`[EmailService] Transporter initialized for ${maskEmail(user)} via ${host}:${port}`);
    } else {
      this.transporter = null;
      console.log('[EmailService] SMTP credentials not fully configured. Running in secure simulated mode.');
    }
  }

  /**
   * Send Welcome Email to newly registered user
   */
  async sendWelcomeEmail(toEmail, userName = 'Team Member') {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const subject = 'Welcome to PragatiPath';
    const textContent = `Welcome to PragatiPath, ${userName}!

Your account has been created successfully.

PragatiPath helps connect project field updates with planned project activities so teams can review and track actual progress more easily.

You can now sign in and start using your workspace at:
${frontendUrl}/login

Regards,
Team OG Developers
PragatiPath`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #FAF8F5; color: #0B1320; border-radius: 16px; border: 1px solid #E8E1D5;">
        <div style="margin-bottom: 24px;">
          <span style="font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #0B1320;">PRAGATI<span style="color: #FF5500;">PATH</span></span>
          <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #64748B;">Progress Intelligence</p>
        </div>
        <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 16px 0; color: #0B1320;">Welcome to PragatiPath, ${userName}!</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 16px;">
          Your account has been created successfully.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
          PragatiPath helps connect project field updates with planned project activities so teams can review and track actual progress more easily.
        </p>
        <div style="margin-bottom: 28px;">
          <a href="${frontendUrl}/login" style="display: inline-block; background: #FF5500; color: #ffffff; padding: 12px 28px; border-radius: 9999px; font-weight: bold; text-decoration: none; font-size: 13px;">
            Sign In to Your Workspace &rarr;
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #E8E1D5; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748B; margin: 0;">
          Regards,<br />
          <strong>Team OG Developers</strong><br />
          PragatiPath Support &bull; <a href="mailto:pragatipath6@gmail.com" style="color: #FF5500; text-decoration: none;">pragatipath6@gmail.com</a>
        </p>
      </div>
    `;

    if (!this.transporter) {
      console.log(`[EmailService:MOCK] Welcome email prepared for ${maskEmail(toEmail)}`);
      return { success: true, simulated: true };
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to: toEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[EmailService] Welcome email sent to ${maskEmail(toEmail)} (Message ID: ${info.messageId})`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`[EmailService] Failed to send welcome email to ${maskEmail(toEmail)}:`, err.message);
      return { success: false, error: err.message };
    }
  }

  /**
   * Send Password Reset Email with secure single-use token link
   */
  async sendPasswordResetEmail(toEmail, rawToken, userName = 'Team Member') {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password?token=${encodeURIComponent(rawToken)}`;
    const subject = 'Reset Your PragatiPath Password';

    const textContent = `Hello ${userName},

A password reset was requested for your PragatiPath account.

Please use the following secure link to reset your password (valid for 60 minutes):
${resetUrl}

If you did not request this password reset, please ignore this email. Your current password remains completely secure.

Regards,
Team OG Developers
PragatiPath`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #FAF8F5; color: #0B1320; border-radius: 16px; border: 1px solid #E8E1D5;">
        <div style="margin-bottom: 24px;">
          <span style="font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #0B1320;">PRAGATI<span style="color: #FF5500;">PATH</span></span>
          <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #64748B;">Security & Identity</p>
        </div>
        <h2 style="font-size: 20px; font-weight: 800; margin: 0 0 16px 0; color: #0B1320;">Password Reset Request</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 16px;">
          Hello ${userName},<br />
          A password reset was requested for your PragatiPath account.
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px;">
          Click the secure button below to set a new password. This link is valid for <strong>60 minutes</strong> and can only be used once.
        </p>
        <div style="margin-bottom: 28px;">
          <a href="${resetUrl}" style="display: inline-block; background: #FF5500; color: #ffffff; padding: 12px 28px; border-radius: 9999px; font-weight: bold; text-decoration: none; font-size: 13px;">
            Set New Password &rarr;
          </a>
        </div>
        <p style="font-size: 12px; color: #64748B; line-height: 1.5; margin-bottom: 24px;">
          If the button does not work, copy and paste this URL into your browser:<br />
          <a href="${resetUrl}" style="color: #FF5500; word-break: break-all;">${resetUrl}</a>
        </p>
        <p style="font-size: 12px; color: #94A3B8; margin-bottom: 24px;">
          If you did not request this password reset, please ignore this email. Your current password remains completely secure.
        </p>
        <hr style="border: none; border-top: 1px solid #E8E1D5; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748B; margin: 0;">
          Regards,<br />
          <strong>Team OG Developers</strong><br />
          PragatiPath Support &bull; <a href="mailto:pragatipath6@gmail.com" style="color: #FF5500; text-decoration: none;">pragatipath6@gmail.com</a>
        </p>
      </div>
    `;

    if (!this.transporter) {
      console.log(`[EmailService:MOCK] Password reset email prepared securely for ${maskEmail(toEmail)}`);
      return { success: true, simulated: true };
    }

    try {
      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to: toEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[EmailService] Password reset email sent to ${maskEmail(toEmail)} (Message ID: ${info.messageId})`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`[EmailService] Failed to send password reset email to ${maskEmail(toEmail)}:`, err.message);
      return { success: false, error: err.message };
    }
  }
}

module.exports = new EmailService();
