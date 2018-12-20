import validate from '../utils/validate'
import data from '../data/index'
//Import method for tests
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

  /**
   * Adds a book to local storage
   * @param {String} title 
   * @param {Number} price 
   * @param {String} genre 
   * @returns {Promise}
   */
    addBook(title, price, genre) {
    validate([
      {key: 'title', value: title, type: String},
      {key: 'price', value: price, type: Number},
      {key: 'genre', value: genre, type: String}
    ])
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = new Book({title, price, genre})
        const books = this._listBooks()
        books.push(book)
        resolve(this._saveBooks(books))
      }, 200)
    })
    
  },

  /**
   * Retrieves a book based on a series of filters
   * @param {String} genre 
   * @param {Number} minPrice 
   * @param {Number} maxPrice 
   * @returns {Promise}
   */
  retrieveBooksbyGenre(genre, minPrice, maxPrice) {
    validate([
      {key: 'genre', value: genre, type: String, optional: true},
      {key: 'minPrice', value: minPrice, type: Number},
      {key: 'maxPrice', value: maxPrice, type: Number}
    ])
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (genre && genre!=='search all') resolve(this._listBooks().filter(item => item.genre === genre && item.price>=minPrice && item.price <=maxPrice))
        else  resolve(this._listBooks().filter(item => item.price>=minPrice && item.price <=maxPrice))
      },200)
    })
   
  },

  /**
   * Retrieves all books in storage
   * @returns {Promise}
   */
  retrieveBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._listBooks())
      })
    })
   
  },

  /**
   * Retrieves the maximum and minimum prices from all the books
   * @returns {Promise}
   */
  retrievePriceRange() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const books = this._listBooks()
        const minimumPrice = books.reduce((min, p) => p.price < min ? p.price : min, books[0].price)
        const maximumPrice = books.reduce((max, p) => p.price > max ? p.price : max, books[0].price)
        resolve({minimumPrice, maximumPrice})
      })
    })
   

  },

  /**
   * Updates information of a specific bool
   * @param {String} id 
   * @param {String} title 
   * @param {Number} price 
   * @param {String} genre 
   * @returns {Promise}
   */
  updateBook(id, title, price, genre) {
    validate([
      {key: 'title', value: title, type: String, optional: true},
      {key: 'price', value: price, type: Number, optional: true},
      {key: 'genre', value: genre, type: String, optional: true}
    ])
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const books = this._listBooks()
          const index = books.findIndex(item => item.id === id)
          if (index < 0) throw Error(`book with id ${id} not found`)
          books[index].title = title ? title : books[index].title
          books[index].genre = genre ? genre : books[index].genre
          books[index].price = price ? price : books[index].price
          resolve(this._saveBooks(books))
        },200)
      })
       


  },
  /**
   * Deletes a book fromm storage
   * @param {Object} id 
   * @returns {Promise}
   */
  deleteBook(id) {
    validate([
      {key: 'id', value: id, type: Object},
    ])
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const books = logic._listBooks()
        const index = books.findIndex(item => item.id === id)
        if (index < 0) throw Error(`book with id ${id} not found`)
        books.splice(index,1)
        resolve(this._saveBooks(books))
      },200)
    })
  

  },

  /**
   * Adds a genre to local storage
   * @param {String} name 
   * @returns {Promise}
   */
  addGenre(name) {
    validate([
      {key: 'name', value: name, type: String},
    ])

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const genres = this._listGenres()
        const existing = genres.find(item => item.name === name)
        if (existing) throw new Error(`${name} is already a genre`)
        const genre = new Genre({name})
        genres.push(genre)
        resolve(this._saveGenres(genres))
      },200)
    })

  },

  /**
   * Deletes a genre from storage
   * @param {Object} id 
   * @param {String} name 
   * @returns {Promise}
   */
  deleteGenre(id, name) {
    validate([
      {key: 'id', value: id, type: Object},
      {key: 'name', value: name, type: String},
    ])
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const genres = logic._listGenres()
        const index = genres.findIndex(item => item.id === id)
        if (index < 0) throw Error(`book with id ${id} not found`)
        genres.splice(index,1)
        const books = logic._listBooks()
        const newBooks = books.filter(item => item.genre!==name)
        this._saveBooks(newBooks)
        resolve(this._saveGenres(genres))
      },200)
    })
    
  },

  /**
   * Retrieves current genres in storage
   * @returns {Promise}
   */
  retrieveGenres() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._listGenres())
      },200)
    })
    
  },

  /**
   * 
   * @param {Object} id 
   * @param {String} name 
   * @returns {Promise}
   */
  updateGenre(id, name) {
    validate([
      {key: 'id', value: id, type: Object},
      {key: 'name', value: name, type: Object},
    ])
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const genres = this._listGenres()
        const index = genres.findIndex(item => item.id === id)
        if (index < 0) throw Error(`book with id ${id} not found`)
        const books = logic._listBooks()
        books.forEach(book => {
          if (genres[index].name===book.genre) {
            book.genre = name
          }
        })
        this._saveBooks(books)
        genres[index].name = name ? name : genres[index].name
        resolve(this._saveGenres(genres))
      },200)
    })
    
  },

}
//Export method for tests
// module.exports = logic
export default logic