import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import transactions from './transactions'
import loginForm from './loginform'
import users from "./users";

export default combineReducers({
  router: routerReducer,
  transactions,
  users,
  ...loginForm
})
