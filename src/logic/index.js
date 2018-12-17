const {Book, Genre} = require('../data')
const logic = {
  addBook(title, price, genre) {
    if (typeof title !== 'string') throw TypeError(`${title} is not a string`)
    if (typeof price !== 'string') throw TypeError(`${price} is not a string`)
    if (typeof genre !== 'string') throw TypeError(`${genre} is not a string`)
    if (!title.trim()) throw Error('title is empty or blank')
    if (!price.trim()) throw Error('price is empty or blank')
    if (!genre.trim()) throw Error('genre is empty or blank')
    const book = new Book({title, price, genre})
    return book.save()
  },

  retrieveBooks(genre) {
    // if (typeof genre !== 'string' && genre!==undefined) throw TypeError(`${genre} is not a string`)
    // if (!genre.trim() && genre===undefined) throw Error('genre is empty or blank')
    
    if (!genre) {
      return Book.findBooks()
        .then(books => books)
    } else {
      return Book.findBooks(genre)
        .then(books => books)
    }

  },

  updateBook(id, title, price, genre) {
    // if (typeof title !== 'string' && title!==null) throw TypeError(`${title} is not a string`)
    // if (typeof price !== 'string' && price!==null) throw TypeError(`${price} is not a string`)
    // if (typeof genre !== 'string' && genre!==null) throw TypeError(`${genre} is not a string`)
    // if (!title.trim() && title!==null) throw Error('title is empty or blank')
    // if (!price.trim() && price!==null) throw Error('price is empty or blank')
    // if (!genre.trim() && genre!==null) throw Error('genre is empty or blank')

    return Book.findById(id)
      .then(book => {
        if (!book) throw Error(`book with id ${id} not found`)
        book.title = title ? title : book.title
        book.genre = genre ? genre : book.genre
        book.price = price ? price : book.price

        return book.save()

      })
  },

  deleteBook(id) {
    // if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
    // if (!id.trim()) throw Error('id is empty or blank')

    return Book.findById(id)
      .then(book => {
        return book.remove()
      })
  },

  addGenre(name) {
    if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
    if (!name.trim()) throw Error('name is empty or blank')

    const genre = new Genre({name})
    return genre.save()
  },

  deleteGenre(id) {
    // if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
    // if (!id.trim()) throw Error('id is empty or blank')

    return Genre.findById(id) 
      .then(genre => {
        return genre.remove()
      })
  },

  retrieveGenres() {
    return Genre.findGenres() 
      .then(genres => {
        return genres
      })
  },

  updateGenre(id, name) {
    // if (typeof id !== 'string') throw TypeError(`${id} is not a string`)
    // if (!id.trim()) throw Error('id is empty or blank')
    if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
    if (!name.trim()) throw Error('name is empty or blank')

    return Genre.findById(id) 
      .then(genre => {
        genre.name = name

        return genre.save()
      })
  },
}

module.exports = logic