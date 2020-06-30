const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
//mongodb+srv://linlin94:<password>@ultimategis2020-21b69.mongodb.net/<dbname>?retryWrites=true&w=majority
const url = "mongodb+srv://linlin94:<password>@ultimategis2020-21b69.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);