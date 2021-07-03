const { MongoClient } = require('mongodb');

function codeGenerator() {
    let symbols = "abcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
        code += symbols[Math.floor(Math.random() * 33)];
    }
    return code;
}

async function main() {
    let arrayForDays = [35];
    for (let i = 0; i < 35; i++) {
        arrayForDays[i] = '0';
    }
    console.log(arrayForDays);
    const uri = "mongodb+srv://demo:12345@cluster0.8p3hn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    let codForMeeting = codeGenerator();
    try {
        await client.connect();
        createListing(client, {
            name: "Name",
            code: codForMeeting,
            day: arrayForDays
        })
    }
     catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


main().catch(console.error);

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function findOneListByName(cllient, nameOfListing) {
    client.db("sample_airbnb").collection("listingAndReviews").findOne({ name: nameOfListing });
    if (result) {
        console.log(`Found a listing in the collection with name '${nameOfListing}'`);
        console.log(result);
    } else {
        console.log(`No listing found with the name '${nameOfListing}'`);
    }
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);

    })
}
