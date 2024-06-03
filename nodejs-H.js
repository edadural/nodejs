// Express'i Başlatma ve Temel Sunucu Kurulumu
// Soru: Bir Express uygulamasını nasıl başlatır ve belirli bir port üzerinde dinlemesini sağlarsınız?
// Görev: Express uygulamasını başlatıp 3000 portunda dinleyen ve sunucu çalıştığında bir mesaj yazdıran kodu yazın.

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// Postman'i Uç Noktaları Test Etmek İçin Ayarlama

// Soru: JSON gövde verisi ile yeni bir kullanıcı oluşturmak için POST isteğini test etmek amacıyla Postman'i nasıl yapılandırırsınız?
// Görev: Aşağıdaki JSON gövdesi ile localhost:3000/users adresine yeni bir POST isteği oluşturmak için Postman'deki adımları açıklayın:

{
    "name": "ali veli",
    "email": "ali@veli.com",
    "password": "abc123!?"
}

// Express'te Ara Yazılım Ekleme

// Soru: Express'te gelen JSON isteklerini ayrıştırmak için hangi ara yazılım kullanılır ve bu kodda nereye yerleştirilmelidir?
// Görev: JSON ara yazılımını kullanmak üzere Express uygulamasını güncelleyin.

app.use(express.json());

// Mongoose ile Kullanıcı Modeli Oluşturma
// Soru: Ad, e-posta, şifre ve yaş alanlarıyla bir Mongoose modeli nasıl tanımlanır?
// Görev: user.js dosyasında bir Mongoose Kullanıcı modelini tanımlayıp dışa aktaran kodu yazın.

const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// MongoDB'ye Bağlanma
// Soru: Bir Express uygulamasında Mongoose kullanarak bir MongoDB veritabanına bağlantı nasıl kurulur?
// Görev: mongoose.js dosyasında task-manager adlı bir MongoDB veritabanına bağlanmak için kodu yazın.

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// Kullanıcı Oluşturma POST İsteklerini İşleme
// Soru: Express uygulamasında yeni kullanıcı oluşturmak için POST istekleri nasıl işlenir?
// Görev: Hataları ele alarak yeni bir kullanıcı oluşturmak için POST /users yolunu güncelleyin.

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Görev Modeli ve Uç Noktaları Oluşturma
// Soru: Mongoose için görev modeli nasıl tanımlanır ve yeni bir görev oluşturma uç noktası nasıl kurulur?
// Görev: task.js dosyasında bir Mongoose Görev modelini tanımlayıp dışa aktaran kodu ve POST /tasks yolunu ekleyin.

// task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

// index.js
const Task = require('./models/task');

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

// Kaynakları Okuma
// Soru: Tüm kullanıcıları ve görevleri fetch etmek için GET uç noktaları nasıl kurulur?
// Görev: Veritabanından tüm kullanıcıları ve görevleri fetch etmek için GET /users ve GET /tasks uç noktalarını kurun.

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch(() => {
        res.status(500).send();
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((e) => {
        res.status(500).send();
    });
});

// ID ile Kaynakları Okuma
// Soru: Bir kullanıcı veya görevi ID'sine göre fetch etmek için GET uç noktaları nasıl kurulur?
// Görev: Veritabanından ID'sine göre bir kullanıcı veya görevi fetch etmek için GET /users/:id ve GET /tasks/:id uç noktalarını kurun.

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    }).catch(() => {
        res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    }).catch(() => {
        res.status(500).send();
    });
});


// ------------------------------------------------------------
// ------------------------------------------------------------

// Soru 1: MongoDB Bağlantısı Kurma
// Soru: MongoDB'ye nasıl bağlanırsınız?
// Cevap: Aşağıdaki kod, MongoDB'ye bağlanmak için kullanılır. MongoClient sınıfı ile bağlantı kurulup, taskManager veritabanına erişilir.

const { MongoClient, ServerApiVersion } = require('mongodb');

const connectionURL = "mongodb+srv://user_name:password@cluster0.eioqkmj.mongodb.net/?retryWrites=true&w=majority&appName=BTU";
const client = new MongoClient(connectionURL, { 
    serverApi: {
        version: ServerApiVersion.v1, 
        strict: true, 
        deprecationErrors: true,
    } 
});

async function run() {
    try {
        await client.connect();
        const dbName = "taskManager";
        const database = client.db(dbName);
        const usersCollection = database.collection("users");
        const tasksCollection = database.collection("tasks");

        console.log('Connected correctly');
    } catch (err) {
        console.error('Something went wrong: ', err);
    } finally {
        await client.close();
        console.log('Connection closing');
    }
}

run().catch(console.dir);

// Soru 2: Kullanıcı Ekleme
// Soru: MongoDB'ye bir kullanıcı belgesi nasıl eklenir?
// Cevap: Aşağıdaki kod, users koleksiyonuna bir kullanıcı ekler.

async function addUser() {
    try {
        await client.connect();
        const dbName = "taskManager";
        const database = client.db(dbName);
        const usersCollection = database.collection("users");

        const result = await usersCollection.insertOne({ name: 'Deneme2', age: 28 });
        console.log('A document was inserted with the _id: ', result.insertedId);
    } catch (err) {
        console.error('Something went wrong trying to insert the new document: ', err);
    } finally {
        await client.close();
        console.log('Connection closing');
    }
}

addUser().catch(console.dir);

// Soru 3: Kullanıcıları Güncelleme
// Soru: Bir kullanıcı belgesini nasıl güncelleyebilirsiniz?
// Cevap: Aşağıdaki kod, users koleksiyonunda name değeri 'Can' olan kullanıcıyı bulup, age alanını 99 olarak günceller.

async function updateUser() {
    try {
        await client.connect();
        const dbName = "taskManager";
        const database = client.db(dbName);
        const usersCollection = database.collection("users");

        const result = await usersCollection.updateOne(
            { name: 'Can' },
            { $set: { age: 99 } }
        );

        console.log('Updated ', result.modifiedCount, ' documents');
    } catch (err) {
        console.error('Something went wrong trying to update the document: ', err);
    } finally {
        await client.close();
        console.log('Connection closing');
    }
}

updateUser().catch(console.dir);

// Soru 4: Kullanıcıları Bulma
// Soru: Belirli bir kriterle kullanıcıları nasıl bulabilirsiniz?
// Cevap: Aşağıdaki kod, users koleksiyonunda completed değeri false olan tüm belgeleri bulur ve yazdırır.

async function findUsers() {
    try {
        await client.connect();
        const dbName = "taskManager";
        const database = client.db(dbName);
        const usersCollection = database.collection("users");

        const cursor = usersCollection.find();
        while (await cursor.hasNext()) {
            console.log(await cursor.next());
        }
    } catch (err) {
        console.error('Something went wrong trying to find the documents: ', err);
    } finally {
        await client.close();
        console.log('Connection closing');
    }
}

findUsers().catch(console.dir);

// Soru 5: Görevleri Bulma
// Soru: tasks koleksiyonunda belirli bir kriterle belgeleri nasıl bulabilirsiniz?
// Cevap: Aşağıdaki kod, tasks koleksiyonunda completed değeri false olan tüm belgeleri bulur ve yazdırır.

async function findTasks() {
    try {
        await client.connect();
        const dbName = "taskManager";
        const database = client.db(dbName);
        const tasksCollection = database.collection("tasks");

        const cursor = tasksCollection.find({ completed: false });
        while (await cursor.hasNext()) {
            console.log(await cursor.next());
        }
    } catch (err) {
        console.error('Something went wrong trying to find the documents: ', err);
    } finally {
        await client.close();
        console.log('Connection closing');
    }
}

findTasks().catch(console.dir);

// Soru 6: Belirli Bir Kullanıcıyı Bulma
// Soru: users koleksiyonunda belirli bir kullanıcıyı nasıl bulabilirsiniz?
// Cevap: Aşağıdaki kod, users koleksiyonunda name değeri 'Can' ve age değeri 99 olan kullanıcıyı bulur ve yazdırır.

async function findUser() {
    try {
        await client.connect();
        const dbName = "taskManager";
        const database = client.db(dbName);
        const usersCollection = database.collection("users");

        const result = await usersCollection.findOne({ name: 'Can', age: 99 });
        if (!result) {
            console.log('Could not find user');
        } else {
            console.log('Found user: ', JSON.stringify(result));
        }
    } catch (err) {
        console.error('Something went wrong trying to find the user: ', err);
    } finally {
        await client.close();
        console.log('Connection closing');
    }
}

findUser().catch(console.dir);


// ---------------------------------------------
// ---------------------------------------------


// Soru 1: MongoDB Bağlantısı Kurma
// Soru: MongoDB'ye nasıl bağlanırsınız?
// Cevap: Aşağıdaki kod, MongoDB'ye bağlanmak için kullanılır. MongoClient sınıfı ile bağlantı kurulup, task-manager veritabanına erişilir.

const { MongoClient } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    console.log('Connected correctly');
    const db = client.db(databaseName);
});

// Soru 2: Kullanıcı Ekleme
// Soru: MongoDB'ye bir kullanıcı belgesi nasıl eklenir?
// Cevap: Aşağıdaki kod, users koleksiyonuna bir kullanıcı ekler.

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name: 'Can',
        age: 20
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user');
        }
        console.log(result.ops);
    });
});

// Soru 3: Birden Çok Kullanıcı Ekleme
// Soru: MongoDB'ye birden fazla kullanıcı belgesi nasıl eklenir?
// Cevap: Aşağıdaki kod, users koleksiyonuna birden fazla kullanıcı ekler.

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    db.collection('users').insertMany([
        { name: 'Can', age: 20 },
        { name: 'Cem', age: 25 }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert users');
        }
        console.log(result.ops);
    });
});

// Soru 4: Görev Ekleme
// Soru: MongoDB'ye birden fazla görev belgesi nasıl eklenir?
// Cevap: Aşağıdaki kod, tasks koleksiyonuna birden fazla görev ekler.

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    db.collection('tasks').insertMany([
        { description: 'Clean the house', completed: true },
        { description: 'Water plants', completed: false },
        { description: 'See the doctor', completed: false }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks');
        }
        console.log(result.ops);
    });
});

// Soru 5: Kullanıcı Belgesini Sorgulama
// Soru: Belirli bir kullanıcıyı nasıl sorgularsınız?
// Cevap: Aşağıdaki kod, users koleksiyonunda name değeri 'Can' olan kullanıcıyı bulur.

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    db.collection('users').findOne({ name: 'Can' }, (error, user) => {
        if (error) {
            return console.log('Unable to find user');
        }
        console.log(user);
    });
});

// Soru 6: Görev Belgesini Sorgulama
// Soru: Belirli bir görevi nasıl sorgularsınız?
// Cevap: Aşağıdaki kod, tasks koleksiyonunda belirli bir ID'ye sahip görevi bulur.

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    db.collection('tasks').findOne({ _id: new ObjectID('copy string id here') }, (error, task) => {
        if (error) {
            return console.log('Unable to find task');
        }
        console.log(task);
    });
});

// Soru 7: Belirli Bir Yaşa Sahip Kullanıcıları Sorgulama
// Soru: Yaşı 26 olan kullanıcıları nasıl sorgularsınız?
// Cevap: Aşağıdaki kod, users koleksiyonunda age değeri 26 olan tüm kullanıcıları bulur.

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    db.collection('users').find({ age: 26 }).toArray((error, users) => {
        if (error) {
            return console.log('Unable to find users');
        }
        console.log(users);
    });
});

// Soru 8: Tamamlanmamış Görevleri Sorgulama
// Soru: Tamamlanmamış görevleri nasıl sorgularsınız?
// Cevap: Aşağıdaki kod, tasks koleksiyonunda completed değeri false olan tüm görevleri bulur.

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);
    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to find tasks');
        }
        console.log(tasks);
    });
});

// ---------------------------------------------
// ---------------------------------------------



// ---------------------------------------------
// ---------------------------------------------

// ---------------------------------------------
// ---------------------------------------------