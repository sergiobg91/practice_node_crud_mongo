import express from "express";
import env from "dotenv";
import mongosee from 'mongoose';
import bodyParser from "body-parser";
import router from "../src/routes/book.route.js";

env.config();

//Usando express para middlewares
const app = express()
app.use(bodyParser.json())

//conexion a la BD
mongosee.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
// const db = mongosee.connection

app.use('/books', router)


const port = process.env.PORT || 3000



app.listen(port, ()=> {
  console.log(`Server listen in port ${port}`);
})