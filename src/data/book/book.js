const fs = require("fs");

class Book {
  constructor({ id, title, genre, price }) {
    this.id = id || Date.now();
    this.title = title;
    this.price = price;
    this.genre = genre;
  }

  save() {
    return new Promise((resolve, reject) => {
      fs.readFile(Book._file, (err, json) => {
        if (err) return reject(err);

        const books = JSON.parse(json);

        const index = books.findIndex(book => book.id === this.id);

        if (index < 0) books.push(this);
        else books[index] = this;

        json = JSON.stringify(books);

        fs.writeFile(Book._file, json, err => {
          if (err) return reject(err);

          resolve();
        });
      });
    });
  }

  remove() {
    return new Promise((resolve, reject) => {
      fs.readFile(Book._file, (err, json) => {
        if (err) return reject(err);

        const books = JSON.parse(json);

        const _books = books.filter(book => book.id !== this.id);
        json = JSON.stringify(_books);

        fs.writeFile(Book._file, json, err => {
          if (err) return reject(err);

          resolve();
        });
      });
    });
  }

  static findBooks(genre) {
    return new Promise((resolve, reject) => {
      fs.readFile(Book._file, (err, json) => {
        if (err) return reject(err);

        const books = JSON.parse(json);

        if (genre) {
          const arr = books.filter(book => book.genre === genre);
          resolve(arr ? arr : undefined);
        } else {
          resolve(books);
        }
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(Book._file, (err, json) => {
        if (err) return reject(err);

        const books = JSON.parse(json);

        const book = books.find(book => book.id === id);

        resolve(book ? new Book(book) : undefined);
      });
    });
  }
}

Book._file = "./book/books.json";

module.exports = Book;
