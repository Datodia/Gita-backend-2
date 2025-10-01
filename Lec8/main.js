const container = document.querySelector('.container')
const productsDiv = document.querySelector('.products')
const factBtn = document.querySelector('.factBtn')
const factResult = document.querySelector('.factResult')
const productSearch = document.querySelector('.productSearch')
const test = document.querySelector('.test')
const changeName = document.querySelector('.changeName')
const form = document.querySelector('form')


function setCookie(key, value, min){
    let expires = ''

    const date = new Date()
    date.setTime(date.getTime() + min * 60 * 1000)

    expires =`; expires=${date.toUTCString()}`

    document.cookie = `${key}=${value}${expires};path=/`
}

console.log(document.cookie, "document.cookie")

function getCookie(key){
    const cokies = document.cookie.split(';')
    let result = null
    for(let cokie of cokies){
        cokie = cokie.trim()
        const res = cokie.split('=')
        if(res[0] === key){
            result = res[1]
        }
    }
    return result
}

const userName = getCookie('name')
console.log(userName, "userNameee")


changeName.addEventListener('click', () => {
    setCookie('lastName', 'giorgadze', 10)
    test.textContent = 'nika'
})



test.textContent = sessionStorage.getItem('userName') || 'Giorgi'

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newProductData = {
        title: form.name.value,
        price: form.price.value,
    }

    const resp = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newProductData)
    })

    if(resp.status >= 200 && resp.status < 300){
        form.name.value = ''
        form.price.value = ''

        alert('Product created successfully')
    }else{

    }
})

function debounce(callBack, delay) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callBack(...args)
        }, delay)
    }
}


productSearch.addEventListener('input', debounce((e) => {
    const query = e.target.value
    productsDiv.innerHTML = ''
    getProducts(`https://dummyjson.com/products/search?q=${query}`)
}, 300))

async function getProducts(url = 'https://dummyjson.com/products') {
    const resp = await fetch(url)
    const data = await resp.json()

    drawProducts(data.products)
}

async function handleDelete(id){
    const resp = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'DELETE'
    })

    if(resp.status === 200){
        alert('Deleted successfully')
    }
}

function drawProducts(products) {

    products.forEach(el => {
        const div = document.createElement('div')
        const name = document.createElement('h1')
        name.textContent = el.title

        const description = document.createElement('p')
        description.textContent = el.description

        const img = document.createElement('img')
        img.src = el.thumbnail
        img.width = 100

        const dltBtn = document.createElement('button')
        dltBtn.textContent = "Delete"

        dltBtn.addEventListener('click', () => handleDelete(el.id))

        div.style.border = '2px solid black'

        div.appendChild(name)
        div.appendChild(description)
        div.appendChild(img)
        div.appendChild(dltBtn)

        productsDiv.append(div)
    })
}

getProducts()

factBtn.addEventListener('click', async () => {
    factResult.textContent = 'Loading...'
    const resp = await fetch('https://catfact.ninja/fact')
    const data = await resp.json()

    factResult.textContent = data.fact
    console.log(data)
})

async function main() {
    const resp = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await resp.json()
    drawData(data)
}

function drawData(data) {

    data.forEach(el => {
        const div = document.createElement('div')
        const name = document.createElement('h1')
        name.textContent = el.name

        const email = document.createElement('h2')
        email.textContent = el.email

        div.style.border = '2px solid black'

        div.appendChild(name)
        div.appendChild(email)

        container.append(div)
    })
}

main()