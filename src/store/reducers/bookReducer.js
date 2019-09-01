import * as actionTypes from "../actions/actionTypes";

const initialState = {
  books: [],
  minimumPrice: null,
  maximumPrice: null,
  totalMaximumPrice: null,
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: [...action.books],
        minimumPrice: action.minimumPrice,
        maximumPrice: action.maximumPrice,
        totalMaximumPrice: action.totalMaximumPrice,
        loading: false
      };

    case actionTypes.DELETE_BOOK_SUCCESS:
      return {
        ...state,
        books: [...action.books]
      };
    case actionTypes.EDIT_BOOK_SUCCESS:
      return {
        ...state,
        books: [...action.books]
      };

    case actionTypes.ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...action.books],
        minimumPrice: action.minimumPrice,
        maximumPrice: action.maximumPrice,
        totalMaximumPrice: action.totalMaximumPrice,
      };

    case actionTypes.FILTER_BOOKS_SUCCESS:
      return {
        ...state,
        books: [...action.books],
        minimumPrice: action.minimumPrice,
        maximumPrice: action.maximumPrice
      };

    case actionTypes.SET_MINIMUM_PRICE:
      return {
        ...state,
        minimumPrice: action.minimumPrice
      };
    case actionTypes.SET_MAXIMUM_PRICE:
      return {
        ...state,
        maximumPrice: action.maximumPrice
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
};

export default reducer;
