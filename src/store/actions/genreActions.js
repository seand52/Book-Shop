import * as actionTypes from "./actionTypes";
import logic from "../../logic/index";

export const fetchGenresSuccess = genres => {
  return {
    type: actionTypes.FETCH_GENRES_SUCCESS,
    genres: genres
  };
};


export const fetchGenres = () => {
  return async dispatch => {
      const {data} = await logic.retrieveGenres();
      dispatch(fetchGenresSuccess(data));
    } 
  };

export const submitGenreSuccess = genres => {
  return {
    type: actionTypes.SUBMIT_GENRE,
    genres: genres
  };
};

export const submitGenre = name => {
  return async dispatch => {
    const {data} = await logic.addGenre(name);
    dispatch(submitGenreSuccess(data));
  };
};

export const deleteGenre = (id) => {
  return async dispatch => {
    const {data} = await logic.deleteGenre(parseInt(id));
    dispatch({
      type: actionTypes.DELETE_GENRE,
      genres: data
    })
  };
};

export const editGenre = (id, name) => {
  return async dispatch => {
    const {data} = await logic.updateGenre(id, name)
    dispatch({
      type: actionTypes.EDIT_GENRE,
      genres: data
    })
  }
}