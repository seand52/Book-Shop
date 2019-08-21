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
      const {data} = await logic.retrieveBooks();
      dispatch(fetchBooksSuccess(data));
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
      const {data} = await logic.deleteBook(id);
      dispatch(deleteBooksSuccess(data));
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
      const {data} = await logic.updateBook(id, title, price, genre);
      dispatch(editBookSuccess(data));
    } 
  };


export const addBook = (title, price, genre) => {
  return async dispatch => {
      const {data} =await logic.addBook(title, price, genre);
      dispatch({
        type: actionTypes.ADD_BOOK_SUCCESS,
        books: data
      });
  };
};

export const filterBooksSuccess = books => {
  return {
    type: actionTypes.FILTER_BOOKS_SUCCESS,
    books: books
  };
};


export const filterBooks = (genre, minPrice, maxPrice, books) => {
  debugger
  return async dispatch => {
      const result = logic.retrieveBooksbyGenre(genre, minPrice, maxPrice, books);
      dispatch(filterBooksSuccess(result));
    }
  };

