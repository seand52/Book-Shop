import React, { Component } from "react";
import "./bookcard.css";
import CreateBook from "../CreateBook/CreateBook";

class BookCard extends Component {
  state = {
    edit: false
  };

  editBook = () => {
    this.setState({ edit: !this.state.edit });
  };

  componentDidUpdate = prevProps => {

    if (prevProps.length === this.props.length) {
      if (
        prevProps.book.title !== this.props.book.title ||
        prevProps.book.price !== this.props.book.price ||
        prevProps.book.genre !== this.props.book.genre
      ) {
        if(this.state.edit === true) this.setState({ edit: !this.state.edit });
      }
    }
  };

  renderBody() {
    const { title, genre, price } = this.props.book;
    if (this.state.edit)
      return <CreateBook action={"save"} book={this.props.book} />;
    else
      return (
        <div className="book-card__info">
          <p>Title: {title}</p>
          <p>Genre: {genre}</p>
          <p>Price: {`${price} euros`}</p>
        </div>
      );
  }

  render() {
    return (
      <section className="book-card">
        <div className="book-card__header">
          <h3>{this.props.book.title}</h3>
        </div>
        {this.renderBody()}
        <div className="actions">
          <i onClick={this.editBook} className="fas fa-edit" />
          <i
            onClick={() => this.props.deleteBook(this.props.book.id)}
            className="fas fa-trash-alt"
          />
        </div>
      </section>
    );
  }
}

export default BookCard;
