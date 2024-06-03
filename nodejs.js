// Soru 1: MongoDB'ye Bağlanma ve Koleksiyon Erişimi
// Soru: MongoDB'ye nasıl bağlanır ve bir veritabanı ile koleksiyonları nasıl erişirsiniz?
// Cevap: Aşağıdaki kod, MongoDB'ye bağlanıp task-manager veritabanındaki users ve tasks koleksiyonlarına erişimi gösterir.

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://username:password@clustername.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();
  const dbName = "task-manager";
  const database = client.db(dbName);
  const usersCollection = database.collection("users");
  const tasksCollection = database.collection("tasks");
  // Kod burada devam eder...
}
run().catch(console.dir);

// Soru 2: Tek Bir Belge Ekleme
// Soru: users koleksiyonuna tek bir belge nasıl eklenir?
// Cevap: Aşağıdaki kod, users koleksiyonuna yeni bir belge ekler.

try {
  const result = await usersCollection.insertOne({
    name: "Deneme2",
    age: 25,
  });
  console.log("A document was inserted with the _id: ", result.insertedId);
} catch (err) {
  console.error(
    "Something went wrong trying to insert the new document: ",
    err
  );
} finally {
  await client.close();
  console.log("Connection closing");
}

// Soru 3: Birden Çok Belge Ekleme
// Soru: users koleksiyonuna birden fazla belge nasıl eklenir?
// Cevap: Aşağıdaki kod, users koleksiyonuna birden fazla belge ekler.

const users = [
  { name: "Eda", age: 23 },
  { name: "Asaf", age: 5 },
];

try {
  const result = await usersCollection.insertMany(users);
  console.log(result.insertedCount, " documents inserted successfully");
} catch (err) {
  console.error(
    "Something went wrong trying to insert the new documents: ",
    err
  );
} finally {
  await client.close();
  console.log("Connection closing");
}

// Soru 4: Belge Güncelleme
// Soru: users koleksiyonunda bir belge nasıl güncellenir?
// Cevap: Aşağıdaki kod, users koleksiyonunda name değeri 'Deneme2' olan belgeyi günceller.

try {
  const result = await usersCollection.updateOne(
    { name: "Deneme2" },
    { $set: { age: 99 } }
  );
  console.log("Updated ", result.modifiedCount, " documents");
} catch (err) {
  console.error("Something went wrong trying to update the document: ", err);
} finally {
  await client.close();
  console.log("Connection closing");
}
// Soru 5: Tüm Belgeleri Getirme
// Soru: users koleksiyonundaki tüm belgeleri nasıl getirirsiniz?
// Cevap: Aşağıdaki kod, users koleksiyonundaki tüm belgeleri getirir ve konsolda listeler.

try {
  const cursor = usersCollection.find();
  while (await cursor.hasNext()) {
    console.log(await cursor.next());
  }
} catch (err) {
  console.error("Something went wrong in find: ", err);
} finally {
  await client.close();
  console.log("Connection closing");
}
// Soru 6: Belirli Bir Belgeyi Getirme
// Soru: users koleksiyonunda belirli bir belgeyi nasıl getirirsiniz?
// Cevap: Aşağıdaki kod, users koleksiyonunda name değeri 'Ali' ve age değeri 23 olan belgeyi getirir.

try {
  const result = await usersCollection.findOne({ name: "Ali", age: 23 });
  if (!result) console.log("Could not find user");
  else console.log("Found user: ", JSON.stringify(result));
} catch (err) {
  console.error("Something went wrong in find: ", err);
} finally {
  await client.close();
  console.log("Connection closing");
}
// Soru 7: Görevleri Ekleme
// Soru: tasks koleksiyonuna birden fazla belge nasıl eklenir?
// Cevap: Aşağıdaki kod, tasks koleksiyonuna birden fazla görev ekler.

const tasks = [
  { description: "Clean the house", completed: true },
  { description: "Water plants", completed: false },
  { description: "See the doctor", completed: false },
];

try {
  const result = await tasksCollection.insertMany(tasks);
  console.log(result.insertedCount, " documents inserted successfully");
} catch (err) {
  console.error(
    "Something went wrong trying to insert the new documents: ",
    err
  );
} finally {
  await client.close();
  console.log("Connection closing");
}
// Soru 8: Tamamlanmamış Görevleri Getirme
// Soru: tasks koleksiyonunda tamamlanmamış görevleri nasıl getirirsiniz?
// Cevap: Aşağıdaki kod, tasks koleksiyonunda completed değeri false olan tüm görevleri getirir ve konsolda listeler.

try {
  const cursor = tasksCollection.find({ completed: false });
  while (await cursor.hasNext()) {
    console.log(await cursor.next());
  }
} catch (err) {
  console.error("Something went wrong in find: ", err);
} finally {
  await client.close();
  console.log("Connection closing");
}


//-------------
//-------------

// Soru 1: Mongoose Modeli Nasıl Oluşturulur?
// Soru: Mongoose kullanarak User ve Task modelleri nasıl oluşturulur?
// Cevap: User ve Task modelleri aşağıdaki gibi oluşturulur. Modeller, şema (schema) tanımlamaları ile birlikte belirli doğrulamalar ve varsayılan değerler içerir.

const mongoose = require("mongoose");
const validator = require("validator");

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
            if (value.length < 7) {
                throw new Error("Veri hatası: şifre karakteri 7 den az olmamalı");
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
                throw new Error("Veri hatası: Yaş sıfırdan büyük olmalı");
            }
        }
    }
});

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
});

// Soru 2: Mongoose ile MongoDB'ye Nasıl Bağlanılır?
// Soru: Mongoose kullanarak MongoDB'ye nasıl bağlanılır?
// Cevap: Mongoose kullanarak MongoDB'ye bağlanmak için mongoose.connect fonksiyonu kullanılır.

async function run() {
    const conn = await mongoose.connect("mongodb+srv://username:password@clustername.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs");
    // Kod burada devam eder...
}
run().catch(console.dir);

// Soru 3: Yeni Bir Kullanıcı Nasıl Eklenir?
// Soru: User modelini kullanarak yeni bir kullanıcı nasıl eklenir?
// Cevap: Yeni bir kullanıcı eklemek için new User ile bir kullanıcı oluşturulur ve save fonksiyonu kullanılır.

const testUser = new User({
    name: "Selim",
    age: 2,
    email: "selim@mail.com",
    password: "1234567"
});

await testUser.save().then(() => {
    console.log(testUser);
}).catch((error) => {
    console.log("Kayıt eklemede hata ", error);
});

// Soru 4: Yeni Bir Görev Nasıl Eklenir?
// Soru: Task modelini kullanarak yeni bir görev nasıl eklenir?
// Cevap: Yeni bir görev eklemek için new Task ile bir görev oluşturulur ve save fonksiyonu kullanılır.

const testTask = new Task({
    description: "deneme"
});

await testTask.save().then(() => {
    console.log(testTask);
}).catch((error) => {
    console.log("Task eklemede hata ", error);
});

// Soru 5: Şifre Doğrulaması Nasıl Yapılır?
// Soru: User modelinde şifre doğrulaması nasıl yapılır?
// Cevap: Şifre doğrulaması, password alanında tanımlanan doğrulama kuralları ile yapılır. Şifre en az 7 karakter uzunluğunda olmalı ve "password" kelimesini içermemelidir.

password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
        if (value.length < 7) {
            throw new Error("Veri hatası: şifre karakteri 7 den az olmamalı");
        }
        if (value.toLowerCase().includes("password")) {
            throw new Error("Veri hatası: Şifre içerisinde 'password' kelimesi olamaz");
        }
    }
}

// Soru 6: E-posta Doğrulaması Nasıl Yapılır?
// Soru: User modelinde e-posta doğrulaması nasıl yapılır?
// Cevap: E-posta doğrulaması, email alanında validator kütüphanesi kullanılarak yapılır.

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
}

// Soru 7: Yaş Doğrulaması Nasıl Yapılır?
// Soru: User modelinde yaş doğrulaması nasıl yapılır?
// Cevap: Yaş doğrulaması, age alanında tanımlanan doğrulama kuralı ile yapılır. Yaş 0'dan büyük olmalıdır.

age: {
    type: Number,
    default: 0,
    validate(value) {
        if (value < 0) {
            throw new Error("Veri hatası: Yaş sıfırdan büyük olmalı");
        }
    }
}

