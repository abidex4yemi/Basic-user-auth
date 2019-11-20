const nodeMailer = require('nodemailer');
const nodeMailerSendgrid = require('nodemailer-sendgrid');

const transporter = nodeMailer.createTransport(
  nodeMailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  }),
);

const sendMail = ({ email, subject, message }) => {
  const mailOptions = {
    from: 'no-reply@idea-lab-p.com',
    to: email,
    subject,
    html: message,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
