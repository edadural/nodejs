
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://edaadurall:lVCQ7dAoo61E20VR@nodejs.aztavxa.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs";

const databaseName = "task-manager"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const id = new ObjectId()

        const db = client.db(databaseName)

        const user = await db.collection("users").findOne({ name: "Eda" },
            (error, user) => {
                if (error) {
                    console.log("Kullanıcı bulunamadı.");
                }
                console.log(user);
            }
        )

        console.log(user);

        // await db.collection("users").insertOne({
        //     _id: id,
        //     name: "Selim",
        //     age: 2
        // })

        // await db.collection("users").insertMany([
        //     {
        //         name: "Esra",
        //         age: 21
        //     },
        //     {
        //         name: "Asaf",
        //         age: 5
        //     },
        // ])

        // await db.collection("tasks").insertMany([
        //     {
        //         description: "Odanı temizle",
        //         completed: true
        //     },
        //     {
        //         description: "Çiçekleri sula",
        //         completed: false
        //     },
        //     {
        //         description: "Ödevlerini yap",
        //         completed: false
        //     },
        // ])

    } finally {
        await client.close();
    }
}
run().catch(console.dir);
