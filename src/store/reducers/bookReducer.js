import * as actionTypes from '../actions/actionTypes'

const initialState = {
  books: [],
  totalBooks: [],
}


const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_BOOKS_SUCCESS: 
    return {
      ...state,
      totalBooks: [...action.totalBooks],
      books: [...action.totalBooks]
    }

    case actionTypes.DELETE_BOOK_SUCCESS: 
    return {
      ...state,
      totalBooks: [...action.books],
      books: [...action.books]
    }
    case actionTypes.EDIT_BOOK_SUCCESS: 
    return {
      ...state,
      totalBooks: [...action.books],
      books: [...action.books]
    }

    case actionTypes.ADD_BOOK_SUCCESS:
    return {
      ...state,
      books: [...action.books],
      totalBooks: [...action.books]
    }
 
    case actionTypes.FILTER_BOOKS_SUCCESS:
    return {
      ...state,
      books: [...action.books]
    }


    default: 
    return state
  }
}

export default reducer