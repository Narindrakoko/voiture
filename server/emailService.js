//emailService.js//

const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
  }

  async sendMail(to, subject, html) {
    try {
      const info = await this.transporter.sendMail({
        from: `"Service Transport" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
      });
      console.log('Email envoyé :', info.messageId);
      return info;
    } catch (err) {
      console.error('Erreur email :', err);
      throw err;
    }
  }
}

module.exports = new EmailService();
