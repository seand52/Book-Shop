import React, { Component } from "react";
import logic from "../../logic/index";
import BookCard from "../BookCard/BookCard";
import { notification } from "antd";
import Filter from "../Filter/Filter";
import "./listbooks.scss"

class ListBooks extends Component {
  state = {
    books: null,
    totalBooks: null,
    genres: null
  };

  openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };

  async componentDidMount() {
    try {
      const books = await logic.retrieveBooks();
      this.setState({ books, totalBooks: books });
    } catch (err) {
      this.openNotification("error", err.message);
    }
  }

  async componentWillReceiveProps(props) {
    try {
      if (props) {
        const books = await logic.retrieveBooks();
        const genres = await logic.retrieveGenres();
        this.setState({ books, genres, totalBooks: books });
      }
    } catch (err) {
      this.openNotification("error", err.message);
    }
  }

  handleDeleteBook = async id => {
    try {
      await logic.deleteBook(id);
      const books = await logic.retrieveBooks();
      this.setState({ books });
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  handleFilter = async (genre, minPrice, maxPrice) => {
    try {
    const books = await logic.retrieveBooksbyGenre(genre, minPrice, maxPrice);
    this.setState({ books });
    } catch(err) {
      this.openNotification("error", err.message)
    }
  };

  render() {
    const { books, genres, totalBooks } = this.state;
    return (
      <section className="main-body">
        <div className="books-list-section">
          <Filter
            editToggle={this.props.editToggle}
            edit = {this.props.edit}
            books={totalBooks && totalBooks.length}
            genres={genres}
            filter={this.handleFilter}
          />

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
