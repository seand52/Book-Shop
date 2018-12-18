const storage = sessionStorage
if (!storage.getItem('postits'))
    storage.setItem('postits', JSON.stringify([]))

if (!storage.getItem('users'))
    storage.setItem('users', JSON.stringify([]))

class Book {
  constructor({ id, title, genre, price }) {
    this.id = id || Date.now();
    this.title = title;
    this.price = price;
    this.genre = genre;
  }

}

Book._file = "./book/books.json";

module.exports = Book;
// export default Book
