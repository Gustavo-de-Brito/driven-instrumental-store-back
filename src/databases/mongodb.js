import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGODB_URI);
let db = null;

mongoClient.connect(() => {
  db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
});

const objectId = ObjectId;

export { db, objectId };