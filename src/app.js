import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost:27017/BookLibrary").then((error) => {
  if (!error) console.log(error.message);
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("conection failed :(");
});
db.once("open", () => {
  console.log("let's go mongo db");
});

app.use("/query", graphqlHTTP({ schema, graphiql: true }));

app.listen(3000, () => {
  console.log(`hello port 3000 :)`);
});
