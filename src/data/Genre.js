class Genre {
  constructor({ id, name }) {
    this.id = id || Date.now();
    this.name = name;
  }
}

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
export default {Genre, defaultGenres}
//Export for tests
// module.exports = {Genre, defaultGenres}