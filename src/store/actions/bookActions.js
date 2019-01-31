import * as actionTypes from "./actionTypes";
import logic from "../../logic/index";

export const fetchBooksSuccess = books => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    totalBooks: books
  };
};
export const fetchBooksFail = err => {
  return {
    type: actionTypes.FETCH_BOOKS_FAIL,
    error: err.message
  };
};
export const fetchBooksStart = () => {
  return {
    type: actionTypes.FETCH_BOOKS_START
  };
};

export const fetchBooks = () => {
  return async dispatch => {
    try {
      const books = await logic.retrieveBooks();
      dispatch(fetchBooksSuccess(books));
    } catch (err) {
      dispatch(fetchBooksFail(err.message));
    }
  };
};

export const deleteBooksFail = err => {
  return {
    type: actionTypes.DELETE_BOOK_FAIL,
    error: err.message
  };
};
export const deleteBooksSuccess = books => {
  return {
    type: actionTypes.DELETE_BOOK_SUCCESS,
    books: books
  };
};

export const deleteBook = id => {
  return async dispatch => {
    try {
      await logic.deleteBook(id);
      const books = await logic.retrieveBooks();
      dispatch(deleteBooksSuccess(books));
    } catch (err) {
      dispatch(deleteBooksFail(err.message));
    }
  };
};

export const editBookSuccess = books => {
  return {
    type: actionTypes.EDIT_BOOK_SUCCESS,
    books: books
  };
};

export const editBookFail = err => {
  return {
    type: actionTypes.EDIT_BOOK_FAIL,
    error: err
  };
};

export const editBook = (id, title, price, genre) => {
  return async dispatch => {
    try {
      await logic.updateBook(id, title, price, genre);
      const books = await logic.retrieveBooks();
      dispatch(editBookSuccess(books));
    } catch (err) {
      dispatch(editBookFail(err));
    }
  };
};

export const addBook = (title, price, genre) => {
  return async dispatch => {
    try {
      await logic.addBook(title, price, genre);
      const books = await logic.retrieveBooks();
      dispatch({
        type: actionTypes.ADD_BOOK_SUCCESS,
        books: books
      });
    } catch (err) {
      dispatch({
        type: actionTypes.ADD_BOOK_FAIL,
        error: err
      });
    }
  };
};

export const filterBooksSuccess = books => {
  return {
    type: actionTypes.FILTER_BOOKS_SUCCESS,
    books: books
  };
};

export const filterBooksFail = err => {
  return {
    type: actionTypes.FILTER_BOOKS_FAIL,
    error: err
  };
};

export const filterBooks = (genre, minPrice, maxPrice) => {
  return async dispatch => {
    try {
      const books = await logic.retrieveBooksbyGenre(genre, minPrice, maxPrice);
      dispatch(filterBooksSuccess(books));
    } catch (err) {
      dispatch(filterBooksFail(err));
    }
  };
};
