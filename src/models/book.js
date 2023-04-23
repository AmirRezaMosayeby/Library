import mongoose from "mongoose";
import Author from "./author.js";

const Book = new mongoose.Schema({
  name: { type: String, required: true },
  page: { type: Number, required: true },
  author: {
    type: mongoose.Types.ObjectId,
    ref: Author,
  },
});

export default mongoose.model("Book", Book);
