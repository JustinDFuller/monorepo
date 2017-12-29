import test from 'ava';
import { sendEmail } from './handler';

test.cb('It sends an email.', (t) => {
    sendEmail(null, null, (err, result) => {
        t.is(err, null);
        t.is(typeof result.body, 'string');
        t.is(typeof JSON.parse(result.body), 'object');
        t.deepEqual(result.headers, {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        });
        t.is(result.statusCode, 200);
        t.end();
    });
});