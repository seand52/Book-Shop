const BooksData = require('./Book')
const GenreData = require('./Genre')
// import BooksData from './Book'
// import GenreData from './Genre'
const {Book, defaultBooks} = BooksData
const {Genre, defaultGenres} = GenreData
const storage = sessionStorage;

if (!storage.getItem("books")) storage.setItem("books", JSON.stringify([]));
if (!storage.getItem("genres")) storage.setItem("genres", JSON.stringify([]));
sessionStorage.setItem("books", JSON.stringify(defaultBooks));
sessionStorage.setItem("genres", JSON.stringify(defaultGenres));

module.exports = {
  storage,
  Book,
  Genre
}

// export default {
//   storage,
//   Book,
//   Genre
// };
