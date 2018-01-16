import test from 'ava';
import binarySearch from './simpleBinary.js';

const smallArray = [1,2,3];
const largeArray = [];
let largeArrayLength = 1000;
let index = 0;

while (index <= largeArrayLength) {
    largeArray.push(index);
    index++;
}

test('First element in small array', t => {
    t.is(binarySearch(smallArray, 1), 0, 'Result of binary search should be index 0');
});

test('Middle element in small array', t => {
    t.is(binarySearch(smallArray, 2), 1, 'Result of binary search should be index 1');
});

test('Last element in small array', t => {
    t.is(binarySearch(smallArray, 3), 2, 'Result of binary search should be index 2');
});

test('Element not in small array', t => {
    t.is(binarySearch(smallArray, 4), -1, 'Result of binary search should be index -1');
});

test('First element in large array', t => {
    t.is(binarySearch(largeArray, 0), 0, 'Result of binary search should be index 0');
});

test('Middle element in large array', t => {
    t.is(binarySearch(largeArray, 500), 500, 'Result of binary search should be index 1');
});

test('Last element in large array', t => {
    t.is(binarySearch(largeArray, 1000), 1000, 'Result of binary search should be index 2');
});

test('Element not in large array', t => {
    t.is(binarySearch(largeArray, 1001), -1, 'Result of binary search should be index -1');
});
