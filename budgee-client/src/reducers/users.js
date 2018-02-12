import {
  ADD_USER, ADD_USER_FAILURE, ADD_USER_SUCCESS, GET_USER, GET_USER_FAILURE,
  GET_USER_SUCCESS, LOGOUT
} from "../actions/users";

const INITIAL_STATE = {errors: [], isUserLoading: false, loggedIn: false};

function mapAddError(error) {
  switch (error.status) {
    case 404:
      return "User with given username already exists";
    default:
      return "An unexpected error occurred. Please try again later";
  }
}

function mapGetError(error) {
  switch (error.status) {
    case 404:
      return "User with given username does not exist";
    default:
      return "An unexpected error occurred. Please try again later";
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return {...state, isUserLoading: true};
    case ADD_USER_SUCCESS:
      return {...state, isUserLoading: false, loggedIn: true};
    case ADD_USER_FAILURE:
      let newError = mapAddError(action.payload);
      return {...state, errors: [...state.errors, newError]};
    case GET_USER:
      return {...state, userIsLoading: true};
    case GET_USER_SUCCESS:
      return {...state, loggedIn: true};
    case GET_USER_FAILURE:
      newError = mapGetError(action.payload);
      return {...state, errors: [...state.errors, newError]};
    case LOGOUT:
      return {...state, loggedIn: false};
    default:
      return state;

  }
}