const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

function sendMail (subject = process.env.SUBJECT, text = process.env.TEXT) {
  const mailOptions = {
      from: process.env.FROM,
      to: process.env.TO,
      subject,
      text,
  };

  return new Promise((resolve, reject) => {
    return transporter.sendMail(mailOptions, error => {
      if (error) {
          console.log('Error sending mail', error);
          return reject({ success: true, error });
      }
      return resolve({ success: true });
    });
  });
}

module.exports = sendMail;
