import mongoose from "mongoose";

const Author = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  age: Number,
});

export default mongoose.model("Author", Author);
