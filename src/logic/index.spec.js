/*eslint-disable */
const sessionStorage = require('sessionstorage')
global.sessionStorage = sessionStorage
const logic = require(".");
const { expect } = require("chai");
const data = require('../data/index')
const {storage, Book, Genre} = data

describe("logic", () => {
  beforeEach(() => {
    sessionStorage.clear()

    sessionStorage.setItem('books', JSON.stringify([]))
    sessionStorage.setItem('genres', JSON.stringify([]))
  });

  describe("books", () => {
    describe("add book", () => {
      let title, genre, price;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = Math.random();

  
      });

      it("should succeed on correct data", () => {
        logic.addBook(title, price, genre)
        const books = JSON.parse(sessionStorage.getItem('books'))
        expect(books.length).to.equal(1)
        const [book] = books
        expect(book.title).to.equal(title)
        expect(book.genre).to.equal(genre)
        expect(book.price).to.equal(price)
      });
    });

    describe("retrieve books", () => {
      let title, genre1, genre2, genre3, price, book1, book2, book3;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre1 = `genre-${Math.random()}`;
        genre2 = `genre-${Math.random()}`;
        genre3 = `genre-${Math.random()}`;
        price = Math.random();
        book1 = new Book({ title, genre: genre1, price });
        book2 = new Book({ title, genre: genre2, price });
        book3 = new Book({ title, genre: genre3, price });
        sessionStorage.setItem('books', JSON.stringify([book1, book2, book3]))
      });

      it("should retrieve all books if no genre is specified", () => {
        const books = logic.retrieveBooks()

          expect(books.length).to.equal(3);
          const [_book1, _book2, _book3] = books;
          expect(_book1.genre).to.equal(genre1);
          expect(_book2.genre).to.equal(genre2);
          expect(_book3.genre).to.equal(genre3);

      });

      it("should retrieve books for a specific genre", () => {
        const books = logic.retrieveBooksbyGenre(genre1, 0, 100)
          expect(books.length).to.equal(1);
          const [_book1] = books;
          expect(_book1.genre).to.equal(genre1);

      });
    });

    describe("update a book", () => {
      let title, genre, price, book;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;
        book = new Book({ title, genre, price });

        sessionStorage.setItem('books', JSON.stringify([book]))
      });

      it("should retrieve all books if no genre is specified", () => {
        const newGenre = `genre-${Math.random()}`;
        logic.updateBook(book.id, null, null, newGenre)
        const books = JSON.parse(sessionStorage.getItem('books'))

          const [_book] = books;
          expect(_book.title).to.equal(title);
          expect(_book.genre).to.equal(newGenre);
          expect(_book.price).to.equal(price);
      });
    });

     describe("delete a book", () => {
      let title, genre, price, book;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;
        book = new Book({ title, genre, price });

        sessionStorage.setItem('books', JSON.stringify([book]))
      });

      it("should retrieve all books if no genre is specified",  () => {
        logic.deleteBook(book.id)
          const books = JSON.parse(sessionStorage.getItem('books'))
          expect(books.length).to.equal(0);
      });
    });

    describe("add genre", () => {
      let name;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
      });

      it("should succeed on correct data", () => {
          logic.addGenre(name)
          const genres = JSON.parse(sessionStorage.getItem('genres'))
          const [genre] = genres;
          expect(genre.name).to.equal(name);
      });
    });

    describe("delete a genre", () => {
      let name, genre;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
        genre = new Genre({ name });
        sessionStorage.setItem('genres', JSON.stringify([genre]))
      });

      it("should succeed on correct data", () => {
         logic.deleteGenre(genre.id)
          const genres = JSON.parse(sessionStorage.getItem('genres'))
          expect(genres.length).to.equal(0);
      });
    });

      describe("retrieve genres", () => {
      let genre1, genre2, genre3, name1, name2, name3;

      beforeEach(() => {
        name1 = `genre-${Math.random()}`;
        name2 = `genre-${Math.random()}`;
        name3 = `genre-${Math.random()}`;
        genre1 = new Genre({ name: name1 });
        genre2 = new Genre({ name: name2 });
        genre3 = new Genre({ name: name3 });
        sessionStorage.setItem('genres', JSON.stringify([genre1, genre2, genre3]))

      });

      it("should succeed on correct data", () => {
         const genres = logic.retrieveGenres()
          expect(genres.length).to.equal(3);
          const [_genre1, _genre2, _genre3] = genres;
          expect(_genre1.name).to.equal(name1);
          expect(_genre2.name).to.equal(name2);
          expect(_genre3.name).to.equal(name3);
      });
    });

     describe("update a genre", () => {
      let genre, name;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
        genre = new Genre({ name });
        sessionStorage.setItem('genres', JSON.stringify([genre]))
      });

      it("should succeed on correct data", () => {
        const newName = `genre-${Math.random()}`
         logic.updateGenre(genre.id, newName)
          const genres = JSON.parse(sessionStorage.getItem('genres'))
          const [_genre] = genres;
          expect(_genre.name).to.equal(newName);
      });
    });
  });
});
