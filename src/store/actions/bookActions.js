import * as actionTypes from "./actionTypes";
import logic from "../../logic/index";

export const fetchBooksSuccess = (books, minimumPrice, maximumPrice) => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    books,
    minimumPrice,
    maximumPrice,
    totalMaximumPrice: maximumPrice
  };
};

export const setLoading = () => {
  return {
    type: actionTypes.SET_LOADING
  }
}

export const fetchBooks = () => {
  return async dispatch => {
    const { data } = await logic.retrieveBooks();
    dispatch(setLoading())
    const { minimumPrice, maximumPrice } = logic.retrievePriceRange(data);
    dispatch(fetchBooksSuccess(data, minimumPrice, maximumPrice));
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
    const { data } = await logic.deleteBook(id);
    const { minimumPrice, maximumPrice } = logic.retrievePriceRange(data);
    dispatch({
      type: actionTypes.ADD_BOOK_SUCCESS,
      books: data,
      minimumPrice,
      maximumPrice,
      totalMaximumPrice: maximumPrice
    });

  };
};

export const editBookSuccess = books => {
  return {
    type: actionTypes.EDIT_BOOK_SUCCESS,
    books: books
  };
};

export const editBook = (id, title, price, genre) => {
  return async dispatch => {
    const { data } = await logic.updateBook(id, title, price, genre);
    dispatch(editBookSuccess(data));
  };
};

export const addBook = (title, price, genre) => {
  return async dispatch => {
    const { data } = await logic.addBook(title, price, genre);
    const { minimumPrice, maximumPrice } = logic.retrievePriceRange(data);
    dispatch({
      type: actionTypes.ADD_BOOK_SUCCESS,
      books: data,
      minimumPrice,
      maximumPrice,
      totalMaximumPrice: maximumPrice
    });
  };
};

export const filterBooksSuccess = (books, minimumPrice, maximumPrice) => {
  return {
    type: actionTypes.FILTER_BOOKS_SUCCESS,
    books: books,
    minimumPrice,
    maximumPrice
  };
};

export const filterBooks = (genre, minPrice, maxPrice) => {
  return async dispatch => {
    const result = await logic.retrieveBooksbyGenre(genre, minPrice, maxPrice);
    const data = result.data;
    if (!data) {
      dispatch(filterBooksSuccess([], minPrice, maxPrice));
      return;
    }
    dispatch(filterBooksSuccess(data, minPrice, maxPrice));
  };
};

export const changeMinPrice = minimumPrice => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_MINIMUM_PRICE,
      minimumPrice
    });
  };
};

export const changeMaxPrice = maximumPrice => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_MAXIMUM_PRICE,
      maximumPrice
    });
  };
};
