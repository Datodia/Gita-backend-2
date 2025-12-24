

export const sum = (a: number, b: number) => {
    return a + b
}


export const reverseStr = (str: string) => {
    return str.split('').reverse().join('')
}

export const addItemToTheEnd = (item: any, arr: any[]) => {
    arr.push(item)
    return arr
}

export const compileAndroidCode = () => {
  throw new Error('you are using the wrong JDK!');
    // return []
}