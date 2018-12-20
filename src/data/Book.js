class Book {
  constructor({ id, title, genre, price }) {
    this.id = id || Date.now();
    this.title = title;
    this.price = price;
    this.genre = genre;
  }
}

const defaultBooks = [
  {
    id: 100,
    title: "book1",
    genre: "history",
    price: 25
  },
  {
    id: 101,
    title: "book2",
    genre: "development",
    price: 30
  },
  {
    id: 102,
    title: "book3",
    genre: "philosophy",
    price: 35
  }
];

export default {Book, defaultBooks}
//Export for tests
// module.exports = {Book, defaultBooks}