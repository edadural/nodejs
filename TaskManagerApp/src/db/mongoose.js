const mongoose = require("mongoose")
const validator = require("validator")

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Veri hatası: Email hatalı");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value < 7) {
                throw new Error("Veri hatası: şifre karakteri 7 den az olmamalı")
            }
            if (value.toLowerCase().includes("password")) {
                throw new Error("Veri hatası: Şifre içerisinde 'password' kelimesi olamaz");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Veri hatası: Yaş sıfırdan büyük olmalı")
            }
        }
    }
})

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

async function run() {
    const conn = await mongoose.connect("mongodb+srv://edaadurall:lVCQ7dAoo61E20VR@nodejs.aztavxa.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs")

    // const testUser = new User({
    //     name: "Selim",
    //     age: 2,
    //     email: "selim@mail.com",
    //     password: "1234567"
    // })

    // await testUser.save().then(() => {
    //     console.log(testUser);
    // }).catch((error) => {
    //     console.log("Kayıt eklemede hata ", error);
    // })
    
    const testTask = new Task({
        description: "deneme"
    })

    await testTask.save().then(() => {
        console.log(testTask);
    }).catch((error) => {
        console.log("Task eklemede hata ", error);
    })
}

run().catch(console.dir)