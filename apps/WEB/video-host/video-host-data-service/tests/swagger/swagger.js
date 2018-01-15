import test from 'ava';
import swagger from '../../swagger/swagger';

test('Swagger exports a function', t => {
  t.true(typeof swagger === 'function');
});

test('Swagger returns an object', t => {
  t.true(typeof swagger() === 'object');
});