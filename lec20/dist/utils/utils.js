"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileAndroidCode = exports.addItemToTheEnd = exports.reverseStr = exports.sum = void 0;
const sum = (a, b) => {
    return a + b;
};
exports.sum = sum;
const reverseStr = (str) => {
    return str.split('').reverse().join('');
};
exports.reverseStr = reverseStr;
const addItemToTheEnd = (item, arr) => {
    arr.push(item);
    return arr;
};
exports.addItemToTheEnd = addItemToTheEnd;
const compileAndroidCode = () => {
    throw new Error('you are using the wrong JDK!');
};
exports.compileAndroidCode = compileAndroidCode;
//# sourceMappingURL=utils.js.map