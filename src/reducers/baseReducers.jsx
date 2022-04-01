import Immutable from "immutable";
import { VALUE_CHANGED, DELETE_VALUE, FETCH_GENRES_SUCCEEDED } from "actions";

const initialState = Immutable.fromJS({});

const baseReducer = (state = initialState, action) => {
  switch (action.type) {
    case VALUE_CHANGED:
      return state.setIn(
        [...action.payload.field.split(".")],
        Immutable.fromJS(action.payload.value)
      );

    case DELETE_VALUE:
      return state.deleteIn([...action.payload.field.split(".")]);
    case FETCH_GENRES_SUCCEEDED:
      return state.withMutations((state) => {
        // eslint-disable-next-line no-unused-expressions
        action.data.genres?.forEach((genre) =>
          state.setIn(["genres", genre.id], genre)
        );
      });

    default:
      return state;
  }
};

export default baseReducer;
