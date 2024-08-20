import  Router  from 'express';
import Book from '../models/book.model.js';

const router = Router();

//MIDDLEWARE
const getBook = async(req, res, next) => {
  let book
  const { id } = req.params

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(404).json({messege: 'ID no valido'})

  try {
    book = await Book.findById(id)
    if (!book)
      return res.status(404).json({messege: 'ID no encontrado'})
  
  }catch(error) {
    return res.status(500).json({messege : error.messege})
  }

  res.book = book
  next()
}

//Obtenemos todos los libros
router.get('/', async (req, res) => {

  try {
    const books = await Book.find()
    return books.length === 0 ? res.status(204).json([]) : res.json(books)
  
  }catch(error) {
    return res.status(500).json({messege: error.messege})
  }
})

//Obtenemos un libro libros
router.get('/:id', getBook, async (req, res) => {
  return res.json(res.book)
})

//Actualizamos un libro
router.put('/:id', getBook, async (req, res) => {

  try {
    const book = res.book //viene del middleware

    book.title = req.body.title || book.title
    book.author = req.body.author || book.title
    book.gender = req.body.gender || book.gender
    book.date = req.body.date || book.date

    const updatedBook = await book.save()
    return res.json(updatedBook)

  }catch(error) {
    return res.status(400).json({messege: error.messege})
  }
})

//Actualizamos un libro por propiedad
router.patch('/:id', getBook, async (req, res) => {

  if(!req.body.title && !req.body.author && !req.body.gender && !req.body.date)
    return res.status(400).json({message: 'Al menos uno de los campos debe ser enviado'})

  try {
    const book = res.book //viene del middleware

    book.title = req.body.title || book.title
    book.author = req.body.author || book.title
    book.gender = req.body.gender || book.gender
    book.date = req.body.date || book.date

    const updatedBook = await book.save()
    return res.json(updatedBook)

  }catch(error) {
    return res.status(400).json({messege: error.messege})
  }
})

//Eliminamos un libro
router.delete('/:id', getBook, async(req, res) => {

  try {
    
    const book = res.book
    await book.deleteOne({
      _id: book._id
    })
    return res.status(204).json([])
  }catch(error) {
    return res.status(500).json({messege: error.messege})
  }
})

//Crear un libro
router.post('/', async (req, res) => {

  const { title, author, gender, date } = req?.body
  if (!title || ! author || !gender || !date)
    return res.status(400).json({messege: 'Todos los campos son requeridos'})

  const book = new Book(
    {
      title,
      author,
      gender,
      date
    }
  )

  try {
    const newBook = await book.save()
    console.log(newBook);
    return res.status(201).json(newBook)
  
  }catch(error) {
    return res.status(400).json({messege:error.messege })
  }

})

export default router;




