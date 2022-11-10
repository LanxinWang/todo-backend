import { MongoClient, Collection } from "mongodb"
import dotenv from "dotenv"
import { ITodo } from "../types";

dotenv.config({path: "./config.env"});
const {ATLAS_URI} = process.env;

// const client = new MongoClient(ATLAS_URI!);

// const db = client.db("todoData");
// const todoCollection: Collection<ITodo> = db.collection('todoTasks');

// export default todoCollection;

/* 封装 db.js 获取链接数据库实例 */
const mongoose = require('mongoose');
/*第一参数是数据库连接*/
/*第二个参数根据官方配置，不然那个数据库弹出警告*/
/*第三个参数 回调函数*/
mongoose.connect(ATLAS_URI,{useNewUrlParser: true},(err:Error)=>{
  if(err) throw new Error(err.message),
  console.log('数据库连接成功')
})
module.exports = mongoose;