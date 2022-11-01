import { MongoClient,ConnectOptions, Db, Collection } from "mongodb"
import dotenv from "dotenv"
import { Todo } from "../types";

dotenv.config({path: "./config.env"});
const connectionString = process.env.ATLAS_URI||'';

const client = new MongoClient(connectionString);

const db = client.db("todoData");
const todoCollection: Collection<Todo> = db.collection('todoTasks');

export default todoCollection;