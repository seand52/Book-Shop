import * as actionTypes from "./actionTypes";
import logic from "../../logic/index";

export const fetchGenresSuccess = genres => {
  return {
    type: actionTypes.FETCH_GENRES_SUCCESS,
    genres: genres
  };
};
export const fetchGenresFail = err => {
  return {
    type: actionTypes.FETCH_GENRES_FAIL,
    error: err.message
  };
};

export const fetchGenres = () => {
  return async dispatch => {
    try {
      const genres = await logic.retrieveGenres();
      dispatch(fetchGenresSuccess(genres));
    } catch (err) {
      dispatch(fetchGenresFail(err.message));
    }
  };
};

export const submitGenreSuccess = genres => {
  return {
    type: actionTypes.SUBMIT_GENRE,
    genres: genres
  };
};

export const submitGenre = name => {
  return async dispatch => {
    await logic.addGenre(name);
    const genres = await logic.retrieveGenres();
    dispatch(submitGenreSuccess(genres));
  };
};

export const deleteGenre = (id, name) => {
  return async dispatch => {
    await logic.deleteGenre(id, name);
    const genres = await logic.retrieveGenres();
    dispatch({
      type: actionTypes.DELETE_GENRE,
      genres: genres
    })
  };
};
