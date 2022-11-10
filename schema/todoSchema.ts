const mongoose = require("../db/conn");
const Schema = mongoose.Schema;

export const todoSchema = new Schema ({
    _id: { type: Number },
    status: { type: String },
    name: { type: String },
})

