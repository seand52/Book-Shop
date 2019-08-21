import validate from "../utils/validate";
import data from "../data/index";
import axios from "axios";
//Import method for tests
// const data = require('../data/index')
const logic = {
  /**
   * Adds a book to local storage
   * @param {String} title
   * @param {Number} price
   * @param {String} genre
   * @returns {Promise}
   */
  addBook(title, price, genre) {
    validate([
      { key: "title", value: title, type: String },
      { key: "price", value: price, type: Number },
      { key: "genre", value: genre, type: Number }
    ]);

    return axios.post("http://localhost:8000/api/books", {
      title,
      id_genre: genre,
      price
    });
  },

  /**
   * Retrieves a book based on a series of filters
   * @param {String} genre
   * @param {Number} minPrice
   * @param {Number} maxPrice
   * @returns {Promise}
   */
  retrieveBooksbyGenre(genre, minPrice, maxPrice, books) {
    debugger
    validate([
      { key: "genre", value: genre, type: String, optional: true },
      { key: "minPrice", value: minPrice, type: Number },
      { key: "maxPrice", value: maxPrice, type: Number }
    ]);
    if (genre && genre !== "search all")
      return books.filter(
        item =>
          item.genre.title === genre &&
          item.price >= minPrice &&
          item.price <= maxPrice
      );
    return books.filter(
      item => item.price >= minPrice && item.price <= maxPrice
    );
  },

  /**
   * Retrieves all books in storage
   * @returns {Promise}
   */
  async retrieveBooks() {
    return axios.get("http://localhost:8000/api/books");
  },

  /**
   * Retrieves the maximum and minimum prices from all the books
   * @returns {Promise}
   */
  retrievePriceRange(books) {
    const minimumPrice = books.reduce(
      (min, p) => (p && p.price < min ? p.price : min),
      books[0].price
    );
    const maximumPrice = books.reduce(
      (max, p) => (p && p.price > max ? p.price : max),
      books[0].price
    );
    return { minimumPrice, maximumPrice };
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
      { key: "title", value: title, type: String, optional: true },
      { key: "price", value: price, type: Number, optional: true },
      { key: "genre", value: genre, type: Number, optional: true }
    ]);;
    return axios.patch(`http://localhost:8000/api/books/${id}`, {
      title,
      price,
      id_genre: genre
    });
  },
  /**
   * Deletes a book fromm storage
   * @param {Object} id
   * @returns {Promise}
   */
  deleteBook(id) {
    return axios.delete(`http://localhost:8000/api/books/${id}`);
  },

  /**
   * Adds a genre to local storage
   * @param {String} name
   * @returns {Promise}
   */
  addGenre(name) {
    validate([{ key: "name", value: name, type: String }]);
    return axios.post("http://localhost:8000/api/genres", { name });
  },

  /**
   * Deletes a genre from storage
   * @param {Object} id
   * @param {String} name
   * @returns {Promise}
   */
  deleteGenre(id, name) {
    validate([{ key: "id", value: id, type: Number }]);
    return axios.delete(`http://localhost:8000/api/genres/${id}`);
  },

  /**
   * Retrieves current genres in storage
   * @returns {Promise}
   */
  retrieveGenres() {
    return axios.get("http://localhost:8000/api/genres");
  },

  /**
   *
   * @param {Object} id
   * @param {String} name
   * @returns {Promise}
   */
  updateGenre(id, name) {
    validate([
      { key: "id", value: id, type: Object },
      { key: "name", value: name, type: Object }
    ]);
    return axios.patch(`http://localhost:8000/api/genres/${id}`, { name });
  }
};
//Export method for tests
// module.exports = logic
export default logic;
