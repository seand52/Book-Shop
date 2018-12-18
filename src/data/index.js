const storage = sessionStorage;
if (!storage.getItem("books")) storage.setItem("books", JSON.stringify([]));

if (!storage.getItem("genres")) storage.setItem("genres", JSON.stringify([]));

class Book {
  constructor({ id, title, genre, price }) {
    this.id = id || Date.now();
    this.title = title;
    this.price = price;
    this.genre = genre;
  }
}

class Genre {
  constructor({ id, name }) {
    this.id = id || Date.now();
    this.name = name;
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

const defaultGenres = [
  {
    id: 1,
    name: "history"
  },

  {
    id: 2,
    name: "development"
  },

  { id: 3, 
    name: "philosophy" 
  }
];
sessionStorage.setItem("books", JSON.stringify(defaultBooks));
sessionStorage.setItem("genres", JSON.stringify(defaultGenres));

// module.exports = {
//   storage,
//   Book,
//   Genre
// }

export default {
  storage,
  Book,
  Genre
};
