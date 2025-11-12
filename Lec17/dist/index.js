"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userName = 'Giorgi';
const userAge = 42;
const isSmoker = false;
function sum(a, b, isPositive) {
    const resp = a + b;
    return isPositive ? Math.abs(resp) : resp;
}
function sum2({ num1, num2, isPositive, isNegative }) {
    console.log(num1, num2, isPositive, isNegative);
}
sum2({
    num1: 1,
    num2: 20,
});
sum(20, 20);
sum(-50, -100, true);
function sumOfNumbers(n) {
}
// sumOfNumbers([1,2,3,4, 'test'])
const numbers = [1, 2, 3, 4, 'test', false];
const btnVarian = 'MD';
function drawBtn(varian) {
    const option = {
        'MD': '20px',
        'SM': '12px',
        'LG': '24px'
    };
    return option[varian];
}
drawBtn('SM');
function getUserInfo(user) {
    return user.grade;
}
function log(a) {
    console.log(a);
}
log({ name: "test" });
function getErrorMessage(err) {
    if (!err)
        return null;
    if (typeof err === 'string') {
        return err;
    }
    if (typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
        return err.message;
    }
    if (typeof err === 'object' && Array.isArray(err) && err.every(el => typeof el === 'string')) {
        return err.map(e => e).join('');
    }
    return null;
}
class User {
    firstName;
    age;
    fullName;
    constructor(name, age, lastName) {
        this.firstName = name;
        this.age = age;
        this.fullName = name + lastName;
    }
    get name() {
        return name;
    }
    static calcAverageGrade(n) {
        const res = n.reduce((tot, cur) => tot + cur, 0);
        console.log(res);
    }
    sayHello() {
        console.log("hello world");
    }
    logUserInfo() {
        console.log(this.firstName, this.age);
    }
}
class User2 extends User {
    constructor(name, age, lastName) {
        super(name, age, lastName);
    }
    logUser2info() {
        this.firstName = 'test';
        console.log(this.firstName);
    }
}
const user3 = new User2('test', 22, 'test');
const user1 = new User('nika', 22, 'nikadze');
console.log(user1.fullName);
user1.logUserInfo();
class Dog {
}
console.log(User);
User.calcAverageGrade([35, 71, 12, 54]);
const arr = new Array();
console.log(arr, "arr");
function getInfo() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res({ name: "user", age: 21 });
        }, 3000);
    });
}
async function main() {
    const res = await getInfo();
}
function getFirstItem(arr) {
    return arr[0];
}
getFirstItem(['tes', 'test2', 'test3']);
getFirstItem([1, 2, 3]);
//# sourceMappingURL=index.js.map