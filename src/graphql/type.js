import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import Author from "../models/author.js";
import Book from "../models/book.js";

export const BookType = new GraphQLObjectType({
  name: "Book",
  description: "lets make books!",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    page: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: personType,
      resolve: async (parent) => {
        try {
          return await Author.findById(parent.author);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  }),
});

export const BookUpdateType = new GraphQLInputObjectType({
  name: "UpadateBooks",
  fields: {
    // id: { type: GraphQLID },
    pages: { type: GraphQLInt },
    name: { type: GraphQLString },
  },
});

export const personType = new GraphQLObjectType({
  name: "Author",
  description: "lets take author!",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    books: {
      type: GraphQLList(BookType),
      resolve: async (parent) => {
        try {
          return await Book.findById(parent.author);
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  }),
});
