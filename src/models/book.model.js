import mongosee from 'mongoose';

const bookSchema = new mongosee.Schema(
  {
    title: String,
    author: String,
    gender: String,
    date: String
  }
)

export default mongosee.model('Book', bookSchema)