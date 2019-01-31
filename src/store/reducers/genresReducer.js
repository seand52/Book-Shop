import * as actionTypes from '../actions/actionTypes'

const initialState = {
  genres: [],
  error: false,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_GENRES_SUCCESS: 
      return {
        ...state,
        genres: [...action.genres]
      }
      case actionTypes.FETCH_GENRES_FAIL:
      return {
        ...state,
        error: !state.error
      }
      case actionTypes.SUBMIT_GENRE:
      return {
        ...state,
        genres: [...action.genres]
      }
      case actionTypes.DELETE_GENRE:
      return {
        ...state,
        genres: [...action.genres]
      }
    default:
    return state
  }
}

export default reducer
