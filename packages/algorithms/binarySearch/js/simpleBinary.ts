function simpleBinary <T> (array: T[] = [], target: T): number {
    let min: number = 0;
    let max: number = array.length - 1;
    let guess: number;
    let ran: number = 0;

    while (min <= max) {
        ran ++;
        guess = Math.floor((min + max) / 2);

        if (target === array[guess]) {
            return guess;
        }

        if (array[guess] < target) {
            min = guess + 1;
        } else {
            max = guess - 1;
        }
    }

    console.log(`Target ${target} ran ${ran} times`);

    return -1;
};

module.exports = simpleBinary;
