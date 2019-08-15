import * as actionTypes from "./actionTypes";
import logic from "../../logic/index";

export const fetchBooksSuccess = books => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    totalBooks: books
  };
};


export const fetchBooks = () => {
  return async dispatch => {
      const books = await logic.retrieveBooks();
      dispatch(fetchBooksSuccess(books));
    } 
  };


export const deleteBooksSuccess = books => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS,
    books: books
  };
};

export const deleteBook = id => {
  return async dispatch => {
      await logic.deleteBook(id);
      const books = await logic.retrieveBooks();
      dispatch(deleteBooksSuccess(books));
    } 
  };


export const editBookSuccess = books => {
  return {
    type: actionTypes.EDIT_BOOK_SUCCESS,
    books: books
  };
};

export const editBook = (id, title, price, genre) => {
  return async dispatch => {
      await logic.updateBook(id, title, price, genre);
      const books = await logic.retrieveBooks();
      dispatch(editBookSuccess(books));
    } 
  };


export const addBook = (title, price, genre) => {
  return async dispatch => {
      await logic.addBook(title, price, genre);
      const books = await logic.retrieveBooks();
      dispatch({
        type: actionTypes.ADD_BOOK_SUCCESS,
        books: books
      });
  };
};

export const filterBooksSuccess = books => {
  return {
    type: actionTypes.FILTER_BOOKS_SUCCESS,
    books: books
  };
};


export const filterBooks = (genre, minPrice, maxPrice) => {
  return async dispatch => {
      const books = await logic.retrieveBooksbyGenre(genre, minPrice, maxPrice);
      dispatch(filterBooksSuccess(books));
    }
  };

