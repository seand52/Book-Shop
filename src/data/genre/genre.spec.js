/*eslint-disable */
const fs = require("fs");
const { expect } = require("chai");
const { Genre } = require("..");

describe("Genre constructor", () => {
  before(() => (Genre._file = "./genre/genres.json"));

  beforeEach(() => fs.writeFileSync(Genre._file, JSON.stringify([])));

  describe("save a genre", () => {
    let name

    beforeEach(() => {
      name = `name-${Math.random()}`;

      fs.writeFileSync(Genre._file, JSON.stringify([]));
    });

    it("should succeed on correct data", () => {
      return new Genre({ name }).save().then(() => {
        const json = fs.readFileSync(Genre._file);
        const genres = JSON.parse(json);
        expect(genres.length).to.equal(1);
        const [genre] = genres;

        expect(genre.name).to.equal(name);
      });
    });
  });

  describe("remove a genre", () => {
    let name, genre
    beforeEach(() => {
      name = `name-${Math.random()}`;

      genre = new Genre({name})

      fs.writeFileSync(Genre._file, JSON.stringify([genre]));
    });

    it("should succeed on correct data", async () => {
      await genre.remove()

      const genres = await Genre.findGenres()

      expect(genres.length).to.equal(0)

    });
  });

   describe("when book already exists", () => {
    let name, id

    beforeEach(() => {
      name = `name-${Math.random()}`;
      const genre = new Genre({ name });
      id = genre.id;
      fs.writeFileSync(Genre._file, JSON.stringify([genre]));
    });

    it("should succeed on correct username", () => {
      let json = fs.readFileSync(Genre._file);
      let genres = JSON.parse(json);
      expect(genres.length).to.equal(1);
      let [genre] = genres;
      expect(genre).to.exist;
      expect(genre.name).to.equal(name);

      const newName = `name-${Math.random()}`;

      const _genre = new Genre({ name: newName });
      _genre.id = id;

      return _genre.save().then(() => {
        json = fs.readFileSync(Genre._file);
        genres = JSON.parse(json);
        expect(genres.length).to.equal(1);
        genre = genres[0];
        expect(genre).to.exist;

        expect(genre.name).to.equal(newName);
      });
    });
  });

  describe("retrieve genres", () => {
    let genre1, genre2, genre3
    beforeEach(() => {
      genre1 = new Genre({ name: 'history' });
      genre2 = new Genre({ name: 'development' });
      genre3 = new Genre({ name: 'mathematics' });
      
      fs.writeFileSync(Genre._file, JSON.stringify([genre1, genre2, genre3]));
    });

    it("should succeed on correct data", () =>
      Genre.findGenres().then(genres => {
        expect(genres.length).to.equal(3);
        const [_genre1, _genre2, _genre3] = genres
        expect(_genre1.name).to.equal('history')
        expect(_genre2.name).to.equal('development')
        expect(_genre3.name).to.equal('mathematics')
      }));

  });

  describe("find genre by id", () => {
    let genre1, genre2, genre3, id
    beforeEach(() => {
      genre1 = new Genre({ name: 'history' });
      genre2 = new Genre({ name: 'development' });
      genre3 = new Genre({ name: 'mathematics' });
      id = genre1.id
      fs.writeFileSync(Genre._file, JSON.stringify([genre1, genre2, genre3]));
    });

    it("should succeed on correct data", () =>
      Genre.findById(id).then(genre => {
        expect(genre).to.exist;
        expect(genre).to.be.instanceOf(Genre);

        expect(genre.name).to.equal(genre1.name);

      }));
  });

  afterEach(() => fs.writeFileSync(Genre._file, JSON.stringify([])))
});
