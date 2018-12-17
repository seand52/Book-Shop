/*eslint-disable */
const fs = require("fs");
const { expect } = require("chai");
const { Book } = require("..");

describe("Books constructor", () => {
  before(() => (Book._file = "./book/books.json"));

  beforeEach(() => fs.writeFileSync(Book._file, JSON.stringify([])));

  describe("save a book", () => {
    let title, genre, price;

    beforeEach(() => {
      title = `title-${Math.random()}`;
      genre = `genre-${Math.random()}`;
      price = `price-${Math.random()}`;

      fs.writeFileSync(Book._file, JSON.stringify([]));
    });

    it("should succeed on correct data", () => {
      return new Book({ title, genre, price }).save().then(() => {
        const json = fs.readFileSync(Book._file);
        const books = JSON.parse(json);
        expect(books.length).to.equal(1);
        const [book] = books;

        expect(book.title).to.equal(title);
        expect(book.genre).to.equal(genre);
        expect(book.price).to.equal(price);
      });
    });
  });

  describe("remove a book", () => {
    let title, genre, price, book
    beforeEach(() => {
      title = `title-${Math.random()}`;
      genre = `genre-${Math.random()}`;
      price = `price-${Math.random()}`;
      book = new Book({title, genre, price})

      fs.writeFileSync(Book._file, JSON.stringify([book]));
    });

    it("should succeed on correct data", async () => {
      await book.remove()

      const books = await Book.findBooks()

      expect(books.length).to.equal(0)

    });
  });

  describe("when book already exists", () => {
    let title, genre, price, id;

    beforeEach(() => {
      title = `title-${Math.random()}`;
      genre = `genre-${Math.random()}`;
      price = `price-${Math.random()}`;
      const book = new Book({ title, genre, price });
      id = book.id;
      fs.writeFileSync(Book._file, JSON.stringify([book]));
    });

    it("should succeed on correct username", () => {
      let json = fs.readFileSync(Book._file);
      let books = JSON.parse(json);
      expect(books.length).to.equal(1);
      let [book] = books;
      expect(book).to.exist;
      expect(book.title).to.equal(title);
      expect(book.genre).to.equal(genre);
      expect(book.price).to.equal(price);

      const newPrice = `price-${Math.random()}`;

      const _book = new Book({ title, genre, price: newPrice });
      _book.id = id;

      return _book.save().then(() => {
        json = fs.readFileSync(Book._file);
        books = JSON.parse(json);
        expect(books.length).to.equal(1);
        book = books[0];
        expect(book).to.exist;

        expect(book.title).to.equal(title);
        expect(book.genre).to.equal(genre);
        expect(book.price).to.equal(newPrice);
      });
    });
  });

  describe("find book by genre", () => {
    let title, genre, price, book1, book2;

    beforeEach(() => {
      title = `title-${Math.random()}`;
      genre = `genre-${Math.random()}`;
      price = `price-${Math.random()}`;
      book1 = new Book({ title, genre, price });
      book2 = new Book({ title, price, genre: "history" });
      fs.writeFileSync(Book._file, JSON.stringify([book1, book2]));
    });

    it("should succeed on valid genre", () =>
      Book.findBooks(genre).then(books => {
        expect(books.length).to.equal(1);
        expect(books[0].genre).to.equal(genre);
      }));

    it("should retrieve all books if no genre is specified", () =>
      Book.findBooks().then(books => {
        expect(books.length).to.equal(2);
      }));
  });

  describe("find book by id", () => {
    let title, genre, price, id;

    beforeEach(() => {
      title = `title-${Math.random()}`;
      genre = `genre-${Math.random()}`;
      price = `price-${Math.random()}`;
      const _book = new Book({ title, genre, price });
      id = _book.id;
      fs.writeFileSync(Book._file, JSON.stringify([_book]));
    });

    it("should succeed on correct username", () =>
      Book.findById(id).then(book => {
        expect(book).to.exist;
        expect(book).to.be.instanceOf(Book);

        expect(book.title).to.equal(title);
        expect(book.genre).to.equal(genre);
        expect(book.price).to.equal(price);
      }));
  });

  afterEach(() => fs.writeFileSync(Book._file, JSON.stringify([])));
});
