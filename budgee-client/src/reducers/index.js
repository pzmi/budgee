import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import transactions from './transactions'
import loginForm from './login_form'
import users from "./users";
import transactionForm from "./transaction_form"
import showFromForm from "./show_from_form"

export default combineReducers({
  router: routerReducer,
  transactions,
  users,
  ...loginForm,
  ...transactionForm,
  ...showFromForm,

})
