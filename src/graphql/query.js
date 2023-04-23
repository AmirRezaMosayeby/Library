import { GraphQLID, GraphQLList } from "graphql";
import Book from "../models/book.js";
import Author from "../models/author.js";
import { BookType, personType } from "./type.js";

export const booksGraph = {
  type: GraphQLList(BookType),
  description: "get all books",
  resolve: async () => {
    try {
      return await Book.find().populate("author");
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const book = {
  type: BookType,
  description: "take single book",
  args: { id: { type: GraphQLID } },
  resolve: async (_, args) => {
    try {
      return await Book.findById(args.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const authorsGraph = {
  type: GraphQLList(personType),
  description: "get all authors",
  resolve: async () => {
    try {
      return await Author.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const author = {
  type: personType,
  description: "get single author!",
  args: { id: { type: GraphQLID } },
  resolve: async (_, args) => {
    try {
      return await Author.findById(args.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
