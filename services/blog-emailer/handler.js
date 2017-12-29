import { get } from 'lodash';
import { createTransport } from 'nodemailer';

const transport = createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

function send(subject = process.env.SUBJECT, text = process.env.TEXT) {
  const mailOptions = {
      from: process.env.FROM,
      to: process.env.TO,
      subject,
      text,
  };

  return new Promise((resolve, reject) => {
    return transport.sendMail(mailOptions, error => {
      if (error) {
          console.log('Error sending mail', error);
          return reject({ success: false, error });
      }
      return resolve({ success: true });
    });
  });
}

module.exports.sendEmail = async (event, context, callback) => {
  const result = await send(get(event, 'body.subject'), get(event, 'body.text'));
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Credentials" : true,
    },
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};
