import {
  VALUE_CHANGED,
  DELETE_VALUE,
  FETCH_GENRES,
  FETCH_GENRES_FAILED,
  FETCH_GENRES_SUCCEEDED,
} from "actions";

/**
 * Generic action for data update operations
 * @param field dot[.] separated data key to save as in redux store (eg * parent.child.grandChild)
 * @param value value to save in the redux
 */
export const valueChanged = (field, value) => ({
  type: VALUE_CHANGED,
  payload: { field, value },
});

/**
 * Generic action for data update operations
 * @param field dot[.] separated data key to delete from redux store (eg * parent.child.grandChild)
 *
 */
export const deleteValue = (field) => ({
  type: DELETE_VALUE,
  payload: { field },
});

/**
 * Action to fetch genre list from public genre.json file
 * */
export const fetchGenres = () => ({
  type: FETCH_GENRES,
  payload: {
    url: "/genres.json",
    onFailure: FETCH_GENRES_FAILED,
    onSuccess: FETCH_GENRES_SUCCEEDED,
  },
});
