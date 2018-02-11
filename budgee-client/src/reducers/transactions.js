import * as Transactions from '../actions/transactions'
import {FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME} from "../actions/transactions";
import {FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_SUCCESS} from "../actions/transactions";
import {FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_FAILURE} from "../actions/transactions";

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
      });
      return {...state, transactions: [...state.transactions, ...newTransactions], areTransactionsLoading: false};
    case Transactions.FETCH_TRANSACTIONS_FAILURE:
    case FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_FAILURE:
      return {...state, areTransactionsLoading: false, errors: [...state.errors, "Could not fetch transactions"]};
    default:
      return state;

  }
}