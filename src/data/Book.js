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
    title: "Clean Code",
    genre: "Development",
    price: 29.99
  },
  {
    id: 101,
    title: "Twilight",
    genre: "Young Adult",
    price: 9.99
  },
  {
    id: 102,
    title: "Game of Thrones",
    genre: "Fantasy",
    price: 19.99
  }
];

export default {Book, defaultBooks}
//Export for tests
// module.exports = {Book, defaultBooks}