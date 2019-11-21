const nodeMailer = require('nodemailer');
const nodeMailerSendgrid = require('nodemailer-sendgrid');

const transporter = nodeMailer.createTransport(
  nodeMailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  }),
);

const sendMail = ({ email, subject, messageBody }) => {
  const mailOptions = {
    from: 'no-reply@idea-lab.com',
    to: email,
    subject,
    html: messageBody,
  };

  return transporter.sendMail(mailOptions);
};

const mailContent = ({ firstName, lastName, id, verificationToken }) => `
<div>
<h3>Dear ${firstName} ${lastName}</h3>
<p>Welcome to idea lab!, Your account was successfully created.</p>
<p>Kindly click this ${process.env.FRONTEND_URL}/verify/${id}/${verificationToken} to confirm your account.</p>
</div>`;

module.exports = { sendMail, mailContent };
