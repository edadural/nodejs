// basit bir selamlayıcı
const greeter = (name = 'user', age) => {
    console.log("Merhaba: " + name);
}

greeter("Eda")
greeter()
