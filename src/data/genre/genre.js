const fs = require("fs");

class Genre {
  constructor({ id, name }) {
    this.id = id || Date.now();
    this.name = name;
  }

  save() {
    return new Promise((resolve, reject) => {
      fs.readFile(Genre._file, (err, json) => {
        if (err) return reject(err);

        const genres = JSON.parse(json);

        const index = genres.findIndex(genre => genre.id === this.id);

        if (index < 0) genres.push(this);
        else genres[index] = this;

        json = JSON.stringify(genres);

        fs.writeFile(Genre._file, json, err => {
          if (err) return reject(err);

          resolve();
        });
      });
    });
  }

  remove() {
    return new Promise((resolve, reject) => {
      fs.readFile(Genre._file, (err, json) => {
        if (err) return reject(err);

        const genres = JSON.parse(json);

        const _genres = genres.filter(genre => genre.id !== this.id);
        json = JSON.stringify(_genres);

        fs.writeFile(Genre._file, json, err => {
          if (err) return reject(err);

          resolve();
        });
      });
    });
  }

  static findGenres() {
    return new Promise((resolve, reject) => {
      fs.readFile(Genre._file, (err, json) => {
        if (err) return reject(err);

        const genres = JSON.parse(json);

        resolve(genres);
      });
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      fs.readFile(Genre._file, (err, json) => {
        if (err) return reject(err);

        const genres = JSON.parse(json);

        const genre = genres.find(genre => genre.id === id);

        resolve(genre ? new Genre(genre) : undefined);
      });
    });
  }
}
Genre._file = "./genres.json";
// module.exports = Genre;
export default Genre
