function simpleBinary(array, target) {
    if (array === void 0) { array = []; }
    var min = 0;
    var max = array.length - 1;
    var guess;
    var ran = 0;
    while (min <= max) {
        ran++;
        guess = Math.floor((min + max) / 2);
        if (target === array[guess]) {
            return guess;
        }
        if (array[guess] < target) {
            min = guess + 1;
        }
        else {
            max = guess - 1;
        }
    }
    console.log("Target " + target + " ran " + ran + " times");
    return -1;
}
;
module.exports = simpleBinary;
//# sourceMappingURL=simpleBinary.js.map