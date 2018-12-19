import React, { Component } from "react";
import logic from "../../logic/index";
import BookCard from "../BookCard/BookCard";
import Filter from "../Filter/Filter";
import "./listbooks.css";

class ListBooks extends Component {
  state = {
    books: null,
    totalBooks: null,
    genres: null
  };

  componentDidMount() {
    const books = logic.retrieveBooks();
    this.setState({ books, totalBooks: books });
  }

  componentWillReceiveProps(props) {
    if (props) {
      const books = logic.retrieveBooks();
      const genres = logic.retrieveGenres()
      this.setState({ books, genres, totalBooks: books });
    }
  }

  handleDeleteBook = id => {
    logic.deleteBook(id);
    const books = logic.retrieveBooks();
    this.setState({ books });
  };

  handleFilter = (genre, minPrice, maxPrice) => {
      const books = logic.retrieveBooksbyGenre(genre, minPrice, maxPrice);
      this.setState({ books });

  };

  render() {
    const { books, genres, totalBooks } = this.state;
    return (
      <section className="main-body">
      <div className="books-list-section">
        <Filter books={totalBooks && totalBooks.length} genres={genres} filter={this.handleFilter} />
     
        <section className="books-list">
          {books &&
            books.map((item, index) => (
              <BookCard
                length={books.length}
                editToggle={this.props.editToggle}
                key={index}
                book={item}
                deleteBook={this.handleDeleteBook}
              />
            ))}
        </section>
      </div>
      </section>
    );
  }
}

export default ListBooks;
