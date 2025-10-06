
function foo(name, age) {
    return { name, age }
}

foo('giorgi', 21)

class User {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    #lastName = 'beridze'

    get lastname() {
        return this.#lastName
    }

    set lastname(ln) {
        this.#lastName = ln
    }

    getLastName() {
        return this.#lastName
    }

    #sayHello() {
        console.log('Hello world')
    }
}

const user1 = new User('Giorgi', 22)
const user2 = new User('Nika', 23)
user1.lastname = 'giorgadze'
console.log(user1.lastname)

// console.log(user1.getLastName())

// console.log(user1.name)
// console.log(user2.name)


class Calcutator {
    #value = null
    constructor(value = 0) {
        this.#value = value
    }

    get number() {
        return this.#value
    }

    set number(num) {
        this.#value = num
    }

    add(num) {
        this.#value += num
        return this
    }

    sub(num) {
        this.#value -= num
        return this
    }
    mult(num) {
        this.#value *= num
        return this
    }
    div(num) {
        this.#value /= num
        return this
    }

    getResult() {
        console.log(this.#value)
    }
}

const calc1 = new Calcutator(5)
calc1.number = 100
console.log(calc1.add(5).div(2).mult(2).number)


class Animal {
    constructor(name) {
        this.name = name
    }

    _test = 'test'

    alive() {
        console.log('Im alive')
    }
}

const animal = new Animal('test')


class Dog extends Animal {
    constructor(name, age) {
        super(name)
        this.age = age
    }


    bark() {
        console.log('Im barking')
    }
}

class ChildDog extends Dog {
    constructor(name) {
        super(name)
    }
}

const child1 = new ChildDog('Bombora')
console.log(child1.name)

const dog1 = new Dog('Jeka', 4)

class Fish extends Animal {
    constructor(name, color) {
        super(name)
        this.color = color
    }

    swim() {
        console.log('im swimming')
    }
}

class Hawk extends Animal {
    constructor(name, speed) {
        super(name)
        this.speed = speed
    }

    fly() {
        console.log('Im flying')
    }

    alive() {
        console.log('sxva rame')
    }
}

const hawk1 = new Hawk('test', 200)
hawk1.alive()

class CoffeMachine {

    makeCoffee() {
        this.#boilWater()
        console.log("coffee is ready")
    }

    #boilWater() {
        console.log("boiling water")
    }
}

const coffee1 = new CoffeMachine()
coffee1.makeCoffee()


// შექმენით მართკუთხედის კლასი, რომლეიც მიიღებს სიგრძეს და სიგანეს და ექნება შემდეგი მეთოდებ
// getArea() => number, getPerimereter() => number, isSquare() => boolean

class Rectangle {
    #width
    #height
    constructor(width, height) {
        this.#width = width
        this.#height = height
    }

    getArea() {
        return this.#width * this.#height
    }

    getPerimeter() {
        return 2 * (this.#width + this.#height)
    }

    isSquare() {
        return this.#height === this.#width
    }
}

const rect1 = new Rectangle(30, 40)
console.log(rect1.getPerimeter())
console.log(rect1.getArea())
console.log(rect1.isSquare())


class Circle {
    #radius
    constructor(radius) {
        this.#radius = radius
    }


    getArea() {
        return Math.PI * this.#radius ** 2
    }


    getLength() {
        return 2 * Math.PI * this.#radius
    }
}


// deposit(), withdraw(500), transferMoney(), getBalance(), getHistory()
// [ {type: 'DEPOSIT', amount: 200, time: '2025-10-06T21:05:02.000Z'} ]

class BankAccount {
    #balance = 0
    #history = []

    #addHistory(type, amount) {
        this.#history.unshift({
            type,
            amount,
            date: new Date().toISOString()
        })
    }

    deposit(amount) {
        this.#balance += amount
        this.#addHistory('DEPOSIT', amount)
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            console.log('Invalid amount')
            return
        }
        this.#balance -= amount 
        this.#addHistory('WITHDRAW', amount)
    }

    transferMoney(to, amount) {
        if (amount > this.#balance) {
            console.log('Invalid amount')
            return
        }
        this.#balance -= amount
        this.#addHistory('TRANFER', amount)
    }

    getBalance() {
        console.log(this.#balance)
    }
    getHistory() {
        console.log(this.#history)
    }
}

const giosBank = new BankAccount
giosBank.deposit(500)
giosBank.transferMoney('0101,123123', 200)
giosBank.withdraw(200)
giosBank.deposit(100)
giosBank.getBalance()
giosBank.getHistory()


class Todo{
    #todos = []

    addTodo(){

    }

    deleteTodo(){

    }

    getTodos(){
        return this.#todos
    }

    checkActive(){

    }
}

const newTodo = new Todo()

newTodo.addTodo('read book')
newTodo.addTodo('reds')

newTodo.getTodos()


class ShoppingCart{
    #cart = []

    addToCart(product){

    }

    deleteItemFromCart(id){

    }

    update(){}

    getCart(){

    }
}