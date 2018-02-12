import {RSAA} from 'redux-api-middleware'

export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const LOGOUT = "LOGOUT";

export const addUser = (user) => ({
  [RSAA]: {
    types: [ADD_USER, ADD_USER_SUCCESS, ADD_USER_FAILURE],
    endpoint: `api/users/${user}`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }
});

export const getUser = (user) => ({
  [RSAA]: {
    types: [GET_USER, GET_USER_SUCCESS, GET_USER_FAILURE],
    endpoint: `api/users/${user}`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }
});

export const logout = () => {
  return {
    type: LOGOUT,
  };
};