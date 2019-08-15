import React, { Component } from "react";
import { connect } from "react-redux";
import logic from "../../logic/index";
import BookCard from "../BookCard/BookCard";
import { notification } from "antd";
import Filter from "../Filter/Filter";
import "./listbooks.scss";
import * as actions from "../../store/actions/index";

class ListBooks extends Component {
  openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };

  async componentDidMount() {
    this.props.onFetchBooks();
    this.props.onGenreFetch();
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
    this.props.onDeleteBook(id);
  };

  handleFilter = async (genre, minPrice, maxPrice) => {
    try {
      await this.props.onFilterBooks(genre, minPrice, maxPrice);
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  render() {
    const { books, genres } = this.props;
    return (
      <section className="main-body">
        <div className="books-list-section">
          <Filter
            editToggle={this.props.editToggle}
            edit={this.props.edit}
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

const mapStateToProps = state => {
  return {
    books: state.booksReducer.books,
    error: state.booksReducer.error,
    genres: state.genresReducer.genres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBooks: () => dispatch(actions.fetchBooks()),
    onDeleteBook: id => dispatch(actions.deleteBook(id)),
    onGenreFetch: () => dispatch(actions.fetchGenres()),
    onFilterBooks: (genre, minPrice, maxPrice) =>
      dispatch(actions.filterBooks(genre, minPrice, maxPrice))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBooks);
