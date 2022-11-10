import *  as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TodoSchema = new Schema ({
    _id: { type: Number },
    status: { type: String },
    name: { type: String },
})

