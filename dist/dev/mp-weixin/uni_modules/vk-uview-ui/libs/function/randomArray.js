"use strict";
function randomArray(array = []) {
  return array.sort(() => Math.random() - 0.5);
}
exports.r = randomArray;
