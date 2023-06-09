import { GraphQLID, GraphQLString, GraphQLInt } from "graphql";
import {
  personType,
  BookType,
  BookUpdateType,
  AuthorUpdateType,
} from "./type.js";
import Author from "../models/author.js";
import Book from "../models/book.js";

export const editBook = {
  type: BookType,
  description: "update for book.",
  args: {
    id: { type: GraphQLID },
    input: { type: BookUpdateType },
  },
  resolve: async (_, args) => {
    try {
      return await Book.findByIdAndUpdate(args.id, args.input);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const deleteBook = {
  type: BookType,
  description: "delete book",
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    try {
      const deleted = await Book.deleteOne({ _id: args.id });
      if (!deleted) return "book deleted.";
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const addBook = {
  type: BookType,
  description: "add new book",
  args: {
    name: { type: GraphQLString },
    page: { type: GraphQLInt },
    author: { type: GraphQLID },
  },
  resolve: async (_, args) => {
    try {
      const author = await Author.findById(args.author);
      if (author) {
        return await Book.create({
          name: args.name,
          page: args.page,
          author: args.author,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const addAuthor = {
  type: personType,
  description: "add new author",
  args: {
    name: { type: GraphQLString },
    desc: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
  resolve: async (_, args) => {
    try {
      return await Author.create({
        name: args.name,
        desc: args.desc,
        age: args.age,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const EditAuthor = {
  type: personType,
  description: "edit one author",
  args: {
    id: { type: GraphQLID },
    data: { type: AuthorUpdateType },
  },
  resolve: async (_, args) => {
    try {
      return await Author.findByIdAndUpdate(args.id, args.data);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

// for (const book of books) {
//   if (book.id === args.id) {
//     books.splice(
//       books.findIndex((book) => book.id === args.id),
//       1
//     );
//     return book;
//   }
// }

// for (const book of books) {
//   if (book.id === args.id) {
//     for (const key in book) {
//       if (Object.prototype.hasOwnProperty.call(book, key)) {
//         if (args.input[key]) {
//           book[key] = args.input[key];
//         }
//       }
//     }
//     return book;
//   }
// }
