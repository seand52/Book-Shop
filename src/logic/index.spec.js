/*eslint-disable */
const fs = require("fs");
const { Book, Genre } = require("../data");
const logic = require(".");
const { expect } = require("chai");

describe("logic", () => {
  before(() => {
    Book._file = "./data/book/books.json";
    Genre._file = "./data/genre/genres.json";
  });

  beforeEach(() => {
    fs.writeFileSync(Book._file, JSON.stringify([]));
    fs.writeFileSync(Genre._file, JSON.stringify([]));
  });

  describe("books", () => {
    describe("add book", () => {
      let title, genre, price;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;

        fs.writeFileSync(Book._file, JSON.stringify([]));
      });

      it("should succeed on correct data", async () => {
        await logic.addBook(title, price, genre).then(() => {
          const json = fs.readFileSync(Book._file);
          const books = JSON.parse(json);
          const [book] = books;
          expect(book.title).to.equal(title);
          expect(book.genre).to.equal(genre);
          expect(book.price).to.equal(price);
        });
      });
    });

    describe("retrieve books", () => {
      let title, genre1, genre2, genre3, price, book1, book2, book3;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre1 = `genre-${Math.random()}`;
        genre2 = `genre-${Math.random()}`;
        genre3 = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;
        book1 = new Book({ title, genre: genre1, price });
        book2 = new Book({ title, genre: genre2, price });
        book3 = new Book({ title, genre: genre3, price });
        fs.writeFileSync(Book._file, JSON.stringify([book1, book2, book3]));
      });

      it("should retrieve all books if no genre is specified", async () => {
        await logic.retrieveBooks().then(books => {
          expect(books.length).to.equal(3);
          const [_book1, _book2, _book3] = books;
          expect(_book1.genre).to.equal(genre1);
          expect(_book2.genre).to.equal(genre2);
          expect(_book3.genre).to.equal(genre3);
        });
      });

      it("should retrieve books for a specific genre", async () => {
        await logic.retrieveBooks(genre1).then(books => {
          expect(books.length).to.equal(1);
          const [_book1] = books;
          expect(_book1.genre).to.equal(genre1);
        });
      });
    });

    describe("update a book", () => {
      let title, genre, price, book;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;
        book = new Book({ title, genre, price });

        fs.writeFileSync(Book._file, JSON.stringify([book]));
      });

      it("should retrieve all books if no genre is specified", async () => {
        const newGenre = `genre-${Math.random()}`;
        await logic.updateBook(book.id, null, null, newGenre).then(() => {
          const json = fs.readFileSync(Book._file);
          const books = JSON.parse(json);
          const [book] = books;
          expect(book.title).to.equal(title);
          expect(book.genre).to.equal(newGenre);
          expect(book.price).to.equal(price);
        });
      });
    });

    describe("delete a book", () => {
      let title, genre, price, book;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;
        book = new Book({ title, genre, price });

        fs.writeFileSync(Book._file, JSON.stringify([book]));
      });

      it("should retrieve all books if no genre is specified", async () => {
        await logic.deleteBook(book.id).then(() => {
          const json = fs.readFileSync(Book._file);
          const books = JSON.parse(json);
          expect(books.length).to.equal(0);
        });
      });
    });

    describe("add genre", () => {
      let name;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
        fs.writeFileSync(Genre._file, JSON.stringify([]));
      });

      it("should succeed on correct data", async () => {
        await logic.addGenre(name).then(() => {
          const json = fs.readFileSync(Genre._file);
          const genres = JSON.parse(json);
          const [genre] = genres;
          expect(genre.name).to.equal(name);
        });
      });
    });

    describe("delete a genre", () => {
      let name, genre;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
        genre = new Genre({ name });
        fs.writeFileSync(Genre._file, JSON.stringify([genre]));
      });

      it("should succeed on correct data", async () => {
        await logic.deleteGenre(genre.id).then(() => {
          const json = fs.readFileSync(Genre._file);
          const genres = JSON.parse(json);
          expect(genres.length).to.equal(0);
        });
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

        fs.writeFileSync(Genre._file, JSON.stringify([genre1, genre2, genre3]));
      });

      it("should succeed on correct data", async () => {
        await logic.retrieveGenres().then(genres => {
          expect(genres.length).to.equal(3);
          const [_genre1, _genre2, _genre3] = genres;
          expect(_genre1.name).to.equal(name1);
          expect(_genre2.name).to.equal(name2);
          expect(_genre3.name).to.equal(name3);
        });
      });
    });

    describe("update a genre", () => {
      let genre, name;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
        genre = new Genre({ name });

        fs.writeFileSync(Genre._file, JSON.stringify([genre]));
      });

      it("should succeed on correct data", async () => {
        const newName = `genre-${Math.random()}`
        await logic.updateGenre(genre.id, newName).then(() => {
          const json = fs.readFileSync(Genre._file);
          const genres = JSON.parse(json);
          const [genre] = genres;
          expect(genre.name).to.equal(newName);
        });
      });
    });
  });
});
