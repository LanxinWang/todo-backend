import { MongoClient,ConnectOptions, Db } from "mongodb"
import dotenv from "dotenv"

dotenv.config({path: "./config.env"});
const connectionString = process.env.ATLAS_URI||'';

const client = new MongoClient(connectionString);

const db = client.db("todoData");
const todoCollection = db.collection('todoTasks');

export default todoCollection;