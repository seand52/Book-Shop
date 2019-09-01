import React, { Component } from "react";
import { connect } from "react-redux";
import logic from "../../logic/index";
import BookCard from "../BookCard/BookCard";
import { notification } from "antd";
import Filter from "../Filter/Filter";
import "./listbooks.scss";
import * as actions from "../../store/actions/index";
import Spinner from "../Spinner/Spinner";

class ListBooks extends Component {
  state = {
    books: null,
    genres: null,
  }
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

  onChangeMinPrice = (minimumPrice) => {
    this.props.changeMinPrice(minimumPrice)
  }

  onChangeMaxPrice = (maximumPrice) => {
    this.props.changeMaxPrice(maximumPrice)
  }

  render() {
    const { books, genres, loading } = this.props;
    return (
      <section className="main-body">
        <div className="books-list-section">
          <Filter
            editToggle={this.props.editToggle}
            edit={this.props.edit}
            genres={genres}
            filter={this.handleFilter}
            onChangeMaxPrice={this.onChangeMaxPrice}
            onChangeMinPrice={this.onChangeMinPrice}
         />  
          <section className="books-list">
            {loading ? <Spinner/> : null}
            {!loading && books && books.length ?
              books.map((item, index) => (
                <BookCard
                  length={books.length}
                  editToggle={this.props.editToggle}
                  key={index}
                  book={item}
                  deleteBook={this.handleDeleteBook}
                />
              )) : null}
            {!loading && books && !books.length ? <p>Sorry, we don't have any books that match with what you searched for!</p> : null}
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
    genres: state.genresReducer.genres,
    loading: state.booksReducer.loading,
    // minimumPrice: state.booksReducer.minimumPrice,
    // maximumPrice: state.booksReducer.maximumPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBooks: () => dispatch(actions.fetchBooks()),
    onDeleteBook: id => dispatch(actions.deleteBook(id)),
    onGenreFetch: () => dispatch(actions.fetchGenres()),
    onFilterBooks: (genre, minPrice, maxPrice) =>
      dispatch(actions.filterBooks(genre, minPrice, maxPrice)),
      changeMinPrice: (minimumPrice) => dispatch(actions.changeMinPrice(minimumPrice)),
      changeMaxPrice: (maximumPrice) => dispatch(actions.changeMaxPrice(maximumPrice))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBooks);
