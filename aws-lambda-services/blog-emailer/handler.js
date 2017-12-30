import { get } from 'lodash';
import { createTransport } from 'nodemailer';

const transport = createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

function send(body) {
  const mailOptions = {
      from: process.env.FROM,
      to: process.env.TO,
      subject: get(body, 'subject', process.env.SUBJECT),
      text: get(body, 'text', process.env.TEXT),
  };

  return new Promise((resolve, reject) => {
    return transport.sendMail(mailOptions, error => {
      if (error) {
          console.log('Error sending mail', error);
          return reject({ success: false, error, body });
      }
      return resolve({ success: true, body });
    });
  });
}

export const sendEmail = async (event, context, callback) => {
  try {
    const body = JSON.parse(get(event, 'body'));
    const result = await send(body);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
      },
      body: JSON.stringify(result),
    };

    return callback(null, response);
  } catch (e) {
    return callback(e);
  }
};
