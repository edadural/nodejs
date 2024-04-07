// Object property shorthand
const username = 'Can'
const userAge = 25

const user = {
    username,
    age: userAge,
    location: 'Bursa'
}
// console.log(user);

// Object Destructuring
const product = {
    label: 'Kırmızı laptop',
    price: 300,
    stock: 20,
    raitng: 3,
    salePrice: undefined
}
// özellik olmasaydı bu şekilde kullanılıcaktı
// const label = product.label
// const stock = product.stock

const { label: etiket, stock, raitng = 5 } = product
// console.log(etiket);
// console.log(stock);
// console.log(raitng);

const transaction = (type, { label, stock }) => {
    // const { label } = myProduct
    console.log(type, label, stock);
}

transaction('sipariş', product)