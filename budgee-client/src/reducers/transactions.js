import * as Transactions from '../actions/transactions'
import {FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME} from "../actions/transactions";
import {FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_SUCCESS} from "../actions/transactions";
import {FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_FAILURE} from "../actions/transactions";
import {LOGOUT} from "../actions/users";
import {TAGS_EDITABLE} from "../actions/transactions";
import {TAGS_TYPE} from "../actions/transactions";
import {UPDATE_TAGS} from "../actions/transactions";
import {UPDATE_TAGS_SUCCESS} from "../actions/transactions";

const INITIAL_STATE = {transactions: [], areTransactionsLoading: false, errors: []};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Transactions.FETCH_TRANSACTIONS:
    case FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME:
      return {...state, areTransactionsLoading: true};
    case Transactions.FETCH_TRANSACTIONS_SUCCESS:
    case FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_SUCCESS:
      if (action.payload === undefined) {
        action.payload = [];
      }
      let newTransactions = action.payload
        .filter(t => t.value != null)
        .map(t => {
        t.transaction_time_date = new Date(t.transaction_time_date).toLocaleString();
        return t
      })
        .map(t => {
          if (t.tags === null) {
            t.tags = []
          }
          return t
        });
      return {...state, transactions: [...state.transactions, ...newTransactions], areTransactionsLoading: false};
    case Transactions.FETCH_TRANSACTIONS_FAILURE:
    case FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_FAILURE:
      return {...state, areTransactionsLoading: false, errors: [...state.errors, "Could not fetch transactions"]};
    case LOGOUT:
      return INITIAL_STATE;
    case TAGS_EDITABLE:
      newTransactions = state.transactions.map(t => {
        if (t.transaction_time === action.transactionTime) {
          return {...t, editable: true, editedTags: t.tags.join(", ")}
        }
        return t;
      });
      return {...state, transactions: newTransactions};
    case TAGS_TYPE:
      newTransactions = state.transactions.map(t => {
        if (t.editable) {
          return {...t, editedTags: action.editedTags}
        }
        return t;
      });
      return {...state, transactions: newTransactions};
    case UPDATE_TAGS:
      newTransactions = state.transactions.map(t => {
        if (t.transaction_time === action.meta.transactionTime) {
          return {...t, editable: false, editedTags: ""}
        }
        return t;
      });
      return {...state, transactions: newTransactions};
    case UPDATE_TAGS_SUCCESS:
      newTransactions = state.transactions.map(t => {
        if (t.transaction_time === action.meta.transactionTime) {
          return {...t, tags: action.meta.tags}
        }
        return t;
      });
      return {...state, transactions: newTransactions};
    default:
      return state;

  }
}