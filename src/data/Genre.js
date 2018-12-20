class Genre {
  constructor({ id, name }) {
    this.id = id || Date.now();
    this.name = name;
  }
}

const defaultGenres = [
  {
    id: 1,
    name: "Development"
  },

  {
    id: 2,
    name: "Fantasy"
  },

  { id: 3, 
    name: "Young Adult" 
  }
];
export default {Genre, defaultGenres}
//Export for tests
// module.exports = {Genre, defaultGenres}