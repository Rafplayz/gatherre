"use strict";
Math.randInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
BigInt.prototype.toJSON = function () {
    console.log(this.toString() + "n");
    return this.toString() + "n";
};
