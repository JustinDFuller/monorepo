import test from 'ava';
import { posts } from './handler';

test.cb('It returns posts.', (t) => {
    posts(null, null, (err, result) => {
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