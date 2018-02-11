import {RSAA} from 'redux-api-middleware'

export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const addUser = (user) => ({
  [RSAA]: {
    types: [ADD_USER, ADD_USER_SUCCESS, ADD_USER_FAILURE],
    endpoint: `/${user}`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }
});