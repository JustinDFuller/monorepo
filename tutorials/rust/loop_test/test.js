'use strict';

let test = 0;
console.time("dbsave");

while (test < 1000) {
  test += 1;

  if (test % 3 === 0) {
    console.log("Hey!");
  }

  if (test === 1000) {
    console.timeEnd("dbsave");
  }
}
