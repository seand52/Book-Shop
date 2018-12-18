import React, { Component } from "react";
import logic from "../../logic/index";
import BookCard from "../BookCard/BookCard";
import "./listbooks.css";
class ListBooks extends Component {
  state = {
    books: null,
    deleted: false
  };

  componentDidMount() {
    const books = logic.retrieveBooks();
    this.setState({ books });
  }

  componentWillReceiveProps(props) {
    if (props) {
      const books = logic.retrieveBooks();
      this.setState({ books });
    }
  }

  handleDeleteBook = (id) => {
    logic.deleteBook(id)
    const books = logic.retrieveBooks()
    this.setState({books })
  }

  render() {
    const { books } = this.state;
    return (
      <section className="books-list-section">
        <h1>Books List</h1>
        <section className="books-list">
          {books &&
            books.map((item, index) => <BookCard length={books.length} editToggle={this.props.editToggle} key={index} book={item} deleteBook={this.handleDeleteBook} />)}
        </section>
      </section>
    );
  }
}

export default ListBooks;
