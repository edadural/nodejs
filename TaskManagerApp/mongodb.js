const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://edaadurall:lVCQ7dAoo61E20VR@nodejs.aztavxa.mongodb.net/?retryWrites=true&w=majority&appName=NodeJs";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    await client.connect();
    const dbName = "task-manager"
    const database = client.db(dbName);
    const usersCollection = database.collection("users");
    const tasksCollection = database.collection("tasks");

    // try {
    //     const result = await usersCollection.insertOne({
    //         name: "Deneme2",
    //         age: 25
    //     });
    //     console.log('A document was inserted with the _id: ', result.insertedId);

    // } catch (err) {
    //     console.error('Something went wrong trying to insert the new documents: ', err);
    // }
    // finally {
    //     await client.close();
    //     console.error('Connection closing');
    // }

    //------------------------------------

    // users = [
    //     { name: "Eda", age: 23 },
    //     { name: "Asaf", age: 5 }
    // ]

    // try {
    //     const result = await usersCollection.insertMany(users);
    //     console.log(result.insertedCount, ' documents inserted successfully');
    // } catch (err) {
    //     console.error('Something went wrong trying to insert the new documents: ', err);
    // } finally {
    //     await client.close();
    //     console.error('Connection closing');
    // }

    //------------------------------------

    // try {
    //     const result = await usersCollection.updateOne(
    //         { name: 'Deneme2' },
    //         { $set: { age: 99 } },
    //     );
    //     console.log('Updated ', result.modifiedCount, ' documents');
    // }
    // catch (err) {
    //     console.error('Something went wrong trying to update documents: ', err)
    // }
    // finally {
    //     await client.close();
    //     console.error('Connection closing');
    // }

    //------------------------------------

    // try {
    //     const cursor = usersCollection.find();
    //     while (await cursor.hasNext()) {
    //         console.log(await cursor.next());
    //     }

    // } catch (err) {
    //     console.error('Something went wrong in find: ', err);
    // }
    // finally {
    //     await client.close();
    //     console.error('Connection closing');
    // }

    //------------------------------------

    // try {
    //     const result = await usersCollection.findOne({ name: 'Ali', age: 23 });
    //     if (!result)
    //         console.log('Could not find user')
    //     else
    //         console.log('Found user: ', JSON.stringify(result))
    // }
    // catch {
    //     console.error('Something went wrong in find: ', err);
    // }
    // finally {
    //     await client.close();
    //     console.error('Connection closing');
    // }

    //------------------------------------

    // tasks = [

    //     { description: 'Clean the house', completed: true },
    //     { description: 'Water plants', completed: false },
    //     { description: 'See the docto', completed: false }
    // ]

    // try {
    //     const result = await tasksCollection.insertMany(tasks);
    //     console.log(result.insertedCount, ' documents inserted successfully');
    // } catch (err) {
    //     console.error('Something went wrong trying to insert in the new documents: ', err)
    // } finally {
    //     await client.close();
    //     console.error('Connection closing');
    // }

    //------------------------------------

    try {
        const cursor = tasksCollection.find({ completed: false });
        while (await cursor.hasNext()) {
            console.log(await cursor.next());
        }
    } catch (err) {
        console.error('Something went wrong in find: ', err);
    }
    finally {
        await client.close();
        console.error('Connection closing');
    }
}
run().catch(console.dir);


// async function run() {
//     try {
//         const id = new ObjectId()

//         const db = client.db(databaseName)

//         const user = await db.collection("users").findOne({ name: "Eda" },
//             (error, user) => {
//                 if (error) {
//                     console.log("Kullanıcı bulunamadı.");
//                 }
//                 console.log(user);
//             }
//         )

//         console.log(user);

//         // await db.collection("users").insertOne({
//         //     _id: id,
//         //     name: "Selim",
//         //     age: 2
//         // })

//         // await db.collection("users").insertMany([
//         //     {
//         //         name: "Esra",
//         //         age: 21
//         //     },
//         //     {
//         //         name: "Asaf",
//         //         age: 5
//         //     },
//         // ])

//         // await db.collection("tasks").insertMany([
//         //     {
//         //         description: "Odanı temizle",
//         //         completed: true
//         //     },
//         //     {
//         //         description: "Çiçekleri sula",
//         //         completed: false
//         //     },
//         //     {
//         //         description: "Ödevlerini yap",
//         //         completed: false
//         //     },
//         // ])

//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);
