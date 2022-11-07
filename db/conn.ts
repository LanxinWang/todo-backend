import { MongoClient, Collection } from "mongodb"
import dotenv from "dotenv"
import { Todo } from "../types";

dotenv.config({path: "./config.env"});
const {ATLAS_URI} = process.env;

const client = new MongoClient(ATLAS_URI!);

const db = client.db("todoData");
const todoCollection: Collection<Todo> = db.collection('todoTasks');

export default todoCollection;