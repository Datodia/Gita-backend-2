

// const userName = 'Giorgi'
// const userAge = 42
// const isSmoker = false


// function sum(a: number, b: number, isPositive?: boolean) {
//     const resp = a + b
//     return isPositive ? Math.abs(resp) : resp
// }

// function sum2({ num1, num2, isPositive, isNegative }: { num1: number, num2: number, isPositive?: boolean, isNegative?: boolean }) {
//     console.log(num1, num2, isPositive, isNegative)
// }

// sum2({
//     num1: 1,
//     num2: 20,
// })

// sum(20, 20)
// sum(-50, -100, true)

// function sumOfNumbers(n: number[]) {

// }

// // sumOfNumbers([1,2,3,4, 'test'])

// const numbers: (number | string | boolean)[] = [1, 2, 3, 4, 'test', false]

// interface IAddress {
//     home: string
//     work: string
// }

// interface IUser {
//     name: string,
//     age: number,
//     isSmoker: boolean,
//     address: IAddress
// }

// interface IStudent extends IUser {
//     grade: string
// }

// type PersonType = {
//     name: string
//     age: number,
//     isSmoker: boolean
// }

// // MD, LG, SM
// type BtnVarianType = 'SM' | 'MD' | 'LG'

// const btnVarian: BtnVarianType = 'MD'

// function drawBtn(varian: BtnVarianType){
//     const option = {
//         'MD': '20px',
//         'SM': '12px',
//         'LG': '24px'
//     }
//     return option[varian]
// }
// drawBtn('SM')

// function getUserInfo(user: IStudent){
//     return user.grade
// }

// function log<T>(a: T){
//     console.log(a)
// }

// log({name: "test"})


// function getErrorMessage(err: unknown): string | null{
//     if(!err) return null
//     if(typeof err === 'string'){
//         return err
//     }
//     if(typeof err === 'object' && 'message' in err && typeof err.message === 'string'){
//         return err.message
//     }

//     if(typeof err === 'object' && Array.isArray(err) && err.every(el => typeof el === 'string')){
//         return err.map(e => e).join('')
//     }

//     return null
// }




// class User {
//     protected firstName
//     private age
//     readonly fullName

//     constructor(name: string, age: number, lastName: string){
//         this.firstName = name
//         this.age = age
//         this.fullName = name + lastName
//     }

//     get name(){
//         return name
//     }

//     static calcAverageGrade(n:number[]){
//         const res = n.reduce((tot, cur) => tot + cur, 0)
//         console.log(res)
//     }

//     sayHello(){
//         console.log("hello world")
//     }

//     logUserInfo(){
//         console.log(this.firstName, this.age)
//     }
// }


// class User2 extends User{
//     constructor(name: string, age: number, lastName: string){
//         super(name, age, lastName)
//     }

//     logUser2info(){
//         this.firstName = 'test'
//         console.log(this.firstName)
//     }
// }


// const user3 = new User2('test', 22, 'test')

// const user1 = new User('nika', 22, 'nikadze')
// console.log(user1.fullName)
// user1.logUserInfo()

// class Dog {}

// console.log(User)


// User.calcAverageGrade([35, 71, 12, 54])

// const arr = new Array()
// console.log(arr, "arr")


// function getInfo(): Promise<{name: string, age: number}> {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res({name: "user", age: 21})
//         }, 3000)
//     })
// }

// async function main(){
//    const res = await getInfo()
// }

// function getFirstItem<T>(arr: T[]): T | undefined{
//     return arr[0]
// }

// getFirstItem<string>(['tes', 'test2', 'test3'])
// getFirstItem<number>([1,2,3])


type UseStateTuple = [string, Function]

function useState(initVal?: any): UseStateTuple {
    let val: string = initVal
    function setState(value: any) {
        val = value
    }

    return [val, setState]
}


const [name, setName] = useState()


type ParseUserTuple = [string, number]

function parseUserData(user: string): ParseUserTuple {
    const [name, age] = user.split(', ')

    return [name as string, Number(age)]
}

const [userAge, userName] = parseUserData('Giorgi, 25')

console.log(userName, userAge)

const Role1: any = {
    USER: 'user',
    EDITOR: 'editor',
    ADMIN: 'admin',

}

// readonly
enum Role {
    USER = 'user',
    EDITOR = 'editor',
    ADMIN = 'admin',
    RAME = 'rame'
}

enum StatusCodes {
    SUCCESS = 200,
    NOTFOUND = 404,
    CREATED = 201,
    BADREQUEST = 400
}


function getSomething(val: string | number | string[]) {
    if (typeof val === 'string') {
        val
    }
    if (typeof val === 'number') {
        val
    }
}


type User = {
    id: number,
    name: string,
    age: number,
    isMerried: boolean,
    email: string,
    phoneNumber: number,
    profilePic: string
}
type OptUser = {
    name?: string,
    age?: number
}
//CRUD
type University = Pick<User, 'name' | 'email' | 'phoneNumber'>
type Director = Omit<User, 'profilePic' | 'name'>
type UpdateUser = Partial<Omit<User, 'id'>>
type ReqUser = Required<OptUser>

type BtnVariant = 'sm' | 'md' | 'lg'

const btnObj: Record<BtnVariant, string> = {
    sm: '24px',
    md: '30px',
    lg: '36px'
}

type Lector = {
    groups: string[]
}
// extends
type Student = User & Lector & {
    grade: number
}


function doSomething(param: unknown) {
    if (typeof param === 'string') {
        param.slice(0, 10)
    }
    if (typeof param === 'number') {
        param.toFixed(2)
    }
    if (typeof param === 'object' && Array.isArray(param)) {
        param.map(el => el.toLowerCase())
    }
}


type NeverType = number & string


function getRole(role: Role) {
    switch (role) {
        case Role.ADMIN:
            console.log('ADMIN')
            break
        case Role.USER:
            console.log('user')
            break;
        case Role.EDITOR:
            console.log('editor')
            break
        default:
            let unreachable: never = role
    }

}