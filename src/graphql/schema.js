import { booksGraph, book, author, authorsGraph } from "./query.js";
import {
  addBook,
  deleteBook,
  editBook,
  addAuthor,
  EditAuthor,
} from "./mutation.js";
import { GraphQLObjectType, GraphQLSchema } from "graphql";

const RootQuery = new GraphQLObjectType({
  name: "Root",
  description: "making query for type.",
  fields: {
    books: booksGraph,
    book,
    authors: authorsGraph,
    author,
  },
});

const MutationQuery = new GraphQLObjectType({
  name: "Mutation",
  description: "make changes!",
  fields: {
    editBook,
    deleteBook,
    addBook,
    addAuthor,
    EditAuthor,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
});

export default schema;
