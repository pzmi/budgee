import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import counter from './counter'
import transactions from './transactions'
import loginForm from './loginform'

export default combineReducers({
  router: routerReducer,
  counter,
  transactions,
  ...loginForm
})
