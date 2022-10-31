import { MongoClient,ConnectOptions, Db } from "mongodb"
import dotenv from "dotenv"

dotenv.config({path: "./config.env"});
const connectionString = process.env.ATLAS_URI||'';

const client = new MongoClient(connectionString);

let dbConnection: Db;
// const db = client.db("todoData");
// const collection = db.collection('todoTasks');

const dbo = {
  connectToServer: function (callback: any) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("todoData");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};

export default dbo;