import validate from '../utils/validate'
import data from '../data/index'
// const data = require('../data/index')
// const validate = require('../utils/validate')


const {storage, Book, Genre} = data
const logic = {

  _listBooks() {
    return JSON.parse(storage.getItem('books'))
  },

  _saveBooks(books) {
    storage.setItem('books', JSON.stringify(books))
  },

  _listGenres() {
    return JSON.parse(storage.getItem('genres'))
  },

  _saveGenres(genres) {
    storage.setItem('genres', JSON.stringify(genres))
  },

  addBook(title, price, genre) {
    validate([
      {key: 'title', value: title, type: String},
      {key: 'price', value: price, type: Number},
      {key: 'genre', value: genre, type: String}
    ])
    const book = new Book({title, price, genre})
    const books = this._listBooks()
    books.push(book)
    this._saveBooks(books)
  },

  retrieveBooksbyGenre(genre) {
    validate([
      {key: 'genre', value: genre, type: String},
    ])
      return this._listBooks().filter(item => item.genre === genre)
  },

  retrieveBooks() {
    return this._listBooks()
  },

  updateBook(id, title, price, genre) {
    validate([
      {key: 'title', value: title, type: String, optional: true},
      {key: 'price', value: price, type: Number, optional: true},
      {key: 'genre', value: genre, type: String, optional: true}
    ])
        const books = this._listBooks()
        const index = books.findIndex(item => item.id === id)
        if (index < 0) throw Error(`book with id ${id} not found`)
        books[index].title = title ? title : books[index].title
        books[index].genre = genre ? genre : books[index].genre
        books[index].price = price ? price : books[index].price
        return this._saveBooks(books)


  },

  deleteBook(id) {
    validate([
      {key: 'id', value: id, type: Object},
    ])

    const books = logic._listBooks()
    const index = books.findIndex(item => item.id === id)
    if (index < 0) throw Error(`book with id ${id} not found`)
    books.splice(index,1)
    this._saveBooks(books)

  },

  addGenre(name) {
    validate([
      {key: 'name', value: name, type: String},
    ])

    const genre = new Genre({name})
    const genres = this._listGenres()
    genres.push(genre)
    this._saveGenres(genres)
  },

  deleteGenre(id) {
    validate([
      {key: 'id', value: id, type: Object},
    ])
    const genres = logic._listGenres()
    const index = genres.findIndex(item => item.id === id)
    if (index < 0) throw Error(`book with id ${id} not found`)
    genres.splice(index,1)
    this._saveGenres(genres)
  },

  retrieveGenres() {
    return this._listGenres()
  },

  updateGenre(id, name) {
    validate([
      {key: 'id', value: id, type: Object},
      {key: 'name', value: name, type: Object},
    ])
    if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
    if (!name.trim()) throw Error('name is empty or blank')

    const genres = this._listGenres()
    const index = genres.findIndex(item => item.id === id)
    if (index < 0) throw Error(`book with id ${id} not found`)
    genres[index].name = name ? name : genres[index].name
    return this._saveGenres(genres)
  },
}

// module.exports = logic
export default logic