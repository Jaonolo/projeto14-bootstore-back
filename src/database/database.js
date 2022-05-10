import mongodb from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db = null;
const mongoClient = new mongodb.MongoClient(process.env.MONGO_URL)

try {

    await mongoClient.connect();
    db = mongoClient.db(process.env.DATABASE);
    console.log('Connected to database successfully');

} catch (error) { console.log('Could not connect to MongoDB: ', error); }

export default db;