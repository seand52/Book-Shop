const sessionStorage = require("sessionstorage");
global.sessionStorage = sessionStorage;
const logic = require(".");
const { expect } = require("chai");
const data = require("../data/index");
const { storage, Book, Genre } = data;

describe("logic", () => {
  beforeEach(() => {
    sessionStorage.clear();

    sessionStorage.setItem("books", JSON.stringify([]));
    sessionStorage.setItem("genres", JSON.stringify([]));
  });

  describe("books", () => {
    describe("add book", () => {
      let title, genre, price;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = Math.random();
      });

      it("should succeed on correct data", async () => {
        await logic.addBook(title, price, genre);
        const books = JSON.parse(sessionStorage.getItem("books"));
        expect(books.length).to.equal(1);
        const [book] = books;
        expect(book.title).to.equal(title);
        expect(book.genre).to.equal(genre);
        expect(book.price).to.equal(price);
      });

      it("should fail on undefined title", () => {
        expect(() => logic.addBook(undefined, price, genre)).to.throw(TypeError, 'undefined is not a string')
      });
      it("should fail on boolean title", () => {
        expect(() => logic.addBook(true, price, genre)).to.throw(TypeError, 'true is not a string')
      });
      it("should fail on numeric title", () => {
        expect(() => logic.addBook(7, price, genre)).to.throw(TypeError, '7 is not a string')
      });
      it("should fail on blank title", () => {
        expect(() => logic.addBook('', price, genre)).to.throw(Error, 'title is empty or blank')
      });
      it("should fail on empty title", () => {
        expect(() => logic.addBook('    \n', price, genre)).to.throw(Error, 'title is empty or blank')
      });
      it("should fail on undefined price", () => {
        expect(() => logic.addBook(title, undefined, genre)).to.throw(TypeError, 'undefined is not a number')
      });
      it("should fail on boolean price", () => {
        expect(() => logic.addBook(title, true, genre)).to.throw(TypeError, 'true is not a number')
      });
      it("should fail on numeric price", () => {
        expect(() => logic.addBook(title, '7', genre)).to.throw(TypeError, '7 is not a number')
      });
      it("should fail on blank price", () => {
        expect(() => logic.addBook(title, '', genre)).to.throw(Error, ' is not a number')
      });
      it("should fail on empty price", () => {
        expect(() => logic.addBook(title, '   \n', genre)).to.throw(Error, '   \n is not a number')
      });
      it("should fail on undefined genre", () => {
        expect(() => logic.addBook(title, price, undefined)).to.throw(TypeError, 'undefined is not a string')
      });
      it("should fail on boolean genre", () => {
        expect(() => logic.addBook(title, price, true)).to.throw(TypeError, 'true is not a string')
      });
      it("should fail on numeric genre", () => {
        expect(() => logic.addBook(title, price, 7)).to.throw(TypeError, '7 is not a string')
      });
      it("should fail on blank genre", () => {
        expect(() => logic.addBook(title, price, '')).to.throw(Error, 'genre is empty or blank')
      });
      it("should fail on empty genre", () => {
        expect(() => logic.addBook(title, price, '    \n')).to.throw(Error, 'genre is empty or blank')
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
        sessionStorage.setItem("books", JSON.stringify([book1, book2, book3]));
      });

      it("should retrieve all books if no genre is specified", async () => {
        const books = await logic.retrieveBooks();

        expect(books.length).to.equal(3);
        const [_book1, _book2, _book3] = books;
        expect(_book1.genre).to.equal(genre1);
        expect(_book2.genre).to.equal(genre2);
        expect(_book3.genre).to.equal(genre3);
      });

      it("should retrieve books for a specific genre", async () => {
        const books = await logic.retrieveBooksbyGenre(genre1, 0, 100);
        expect(books.length).to.equal(1);
        const [_book1] = books;
        expect(_book1.genre).to.equal(genre1);
      });

      it("should search for all books within price range if no genre is specified", async () => {
        const books = await logic.retrieveBooksbyGenre("search all", 0, 100);
        expect(books.length).to.equal(3);
        const [_book1, _book2, _book3] = books;
        expect(_book1.genre).to.equal(genre1);
        expect(_book2.genre).to.equal(genre2);
        expect(_book3.genre).to.equal(genre3);
      });

      it("should fail on undefined genre", () => {
        expect(() => logic.retrieveBooksbyGenre(undefined, 0, 100)).to.throw(TypeError, 'undefined is not a string')
      });
      it("should fail on blank genre", () => {
        expect(() => logic.retrieveBooksbyGenre('', 0, 100)).to.throw(Error, 'genre is empty or blank')
      });
      it("should fail on empty genre", () => {
        expect(() => logic.retrieveBooksbyGenre('   \n', 0, 100)).to.throw(Error, 'genre is empty or blank')
      });

      it("should fail on undefined minPrice", () => {
        expect(() => logic.retrieveBooksbyGenre(genre1, undefined, 100)).to.throw(TypeError, 'undefined is not a number')
      });
      it("should fail on blank minPrice", () => {
        expect(() => logic.retrieveBooksbyGenre(genre1, '', 100)).to.throw(Error, ' is not a number')
      });
      it("should fail on empty minPrice", () => {
        expect(() => logic.retrieveBooksbyGenre(genre1, '    \n', 100)).to.throw(Error, '    \n is not a number')
      });
      it("should fail on undefined maxPrice", () => {
        expect(() => logic.retrieveBooksbyGenre(genre1, 0, undefined)).to.throw(TypeError, 'undefined is not a number')
      });
      it("should fail on blank maxPrice", () => {
        expect(() => logic.retrieveBooksbyGenre(genre1, 0, '')).to.throw(Error, ' is not a number')
      });
      it("should fail on empty maxPrice", () => {
        expect(() => logic.retrieveBooksbyGenre(genre1, 0, '    \n')).to.throw(Error, '    \n is not a number')
      });

    });

    describe("retrieve price range", () => {
      let book1, book2, book3, price1, price2, price3;
      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price1 = 5;
        price2 = 10;
        price3 = 15;
        book1 = new Book({ title, genre, price: price1 });
        book2 = new Book({ title, genre, price: price2 });
        book3 = new Book({ title, genre, price: price3 });
        sessionStorage.setItem("books", JSON.stringify([book1, book2, book3]));
      });

      it("should retrieve the price range for the books", async () => {
        const priceRange = await logic.retrievePriceRange();
        expect(priceRange.minimumPrice).to.equal(5);
        expect(priceRange.maximumPrice).to.equal(15);
      });
      
    });

    describe("update a book", () => {
      let title, genre, price, book;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;
        book = new Book({ title, genre, price });

        sessionStorage.setItem("books", JSON.stringify([book]));
      });

      it("should retrieve all books if no genre is specified", async () => {
        const newGenre = `genre-${Math.random()}`;
        await logic.updateBook(book.id, null, null, newGenre);
        const books = JSON.parse(sessionStorage.getItem("books"));

        const [_book] = books;
        expect(_book.title).to.equal(title);
        expect(_book.genre).to.equal(newGenre);
        expect(_book.price).to.equal(price);
      });

      it("should fail on undefined title", () => {
        expect(() => logic.updateBook(book.id, undefined, price, genre)).to.throw(TypeError, 'undefined is not a string')
      });
      it("should fail on empty title", () => {
        expect(() => logic.updateBook(book.id, '', price, genre)).to.throw(Error, 'title is empty or blank')
      });
      it("should fail on blank title", () => {
        expect(() => logic.updateBook(book.id, '    \n', price, genre)).to.throw(Error, 'title is empty or blank')
      });

      it("should fail on undefined price", () => {
        expect(() => logic.updateBook(book.id, title, undefined, genre)).to.throw(TypeError, 'undefined is not a number')
      });
      it("should fail on empty title", () => {
        expect(() => logic.updateBook(book.id, title, '', genre)).to.throw(Error, ' is not a number')
      });
      it("should fail on blank title", () => {
        expect(() => logic.updateBook(book.id, title, '  ', genre)).to.throw(Error, '  is not a number')
      });

    });

    describe("delete a book", () => {
      let title, genre, price, book;

      beforeEach(() => {
        title = `title-${Math.random()}`;
        genre = `genre-${Math.random()}`;
        price = `price-${Math.random()}`;
        book = new Book({ title, genre, price });

        sessionStorage.setItem("books", JSON.stringify([book]));
      });

      it("should retrieve all books if no genre is specified", async () => {
        await logic.deleteBook(book.id);
        const books = JSON.parse(sessionStorage.getItem("books"));
        expect(books.length).to.equal(0);
      });
    });

    describe("add genre", () => {
      let name;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
      });

      it("should succeed on correct data", async () => {
        await logic.addGenre(name);
        const genres = JSON.parse(sessionStorage.getItem("genres"));
        const [genre] = genres;
        expect(genre.name).to.equal(name);
      });
      it("should fail on undefined name", () => {
        expect(() => logic.addGenre(undefined)).to.throw(TypeError, 'undefined is not a string')
      });
      it("should fail on empty name", () => {
        expect(() => logic.addGenre('')).to.throw(Error, 'name is empty or blank')
      });
      it("should fail on blank name", () => {
        expect(() => logic.addGenre('   \n')).to.throw(Error, 'name is empty or blank')
      });
    });

    describe("delete a genre", () => {
      let name, genre;

      beforeEach(() => {
        name = `genre-${Math.random()}`;
        genre = new Genre({ name });
        sessionStorage.setItem("genres", JSON.stringify([genre]));
      });

      it("should succeed on correct data", async () => {
        await logic.deleteGenre(genre.id);
        const genres = JSON.parse(sessionStorage.getItem("genres"));
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
        sessionStorage.setItem(
          "genres",
          JSON.stringify([genre1, genre2, genre3])
        );
      });

      it("should succeed on correct data", async () => {
        const genres = await logic.retrieveGenres();
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
        sessionStorage.setItem("genres", JSON.stringify([genre]));
      });

      it("should succeed on correct data", async () => {
        const newName = `genre-${Math.random()}`;
        await logic.updateGenre(genre.id, newName);
        const genres = JSON.parse(sessionStorage.getItem("genres"));
        const [_genre] = genres;
        expect(_genre.name).to.equal(newName);
      });
    });
  });
});
