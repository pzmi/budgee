import {RSAA} from 'redux-api-middleware'

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ADD_TRANSACTION_SUCCESS = 'ADD_TRANSACTION_SUCCESS';
export const ADD_TRANSACTION_FAILURE = 'ADD_TRANSACTION_FAILURE';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILURE = 'FETCH_TRANSACTIONS_FAILURE';

export const FETCH_TRANSACTIONS_FROM_DATE = 'FETCH_TRANSACTIONS_FROM_DATE';
export const FETCH_TRANSACTIONS_FROM_DATE_SUCCESS = 'FETCH_TRANSACTIONS_FROM_DATE_SUCCESS';
export const FETCH_TRANSACTIONS_FROM_DATE_FAILURE = 'FETCH_TRANSACTIONS_FROM_DATE_FAILURE';

export const FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME = 'FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME';
export const FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_SUCCESS = 'FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_SUCCESS';
export const FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_FAILURE = 'FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_FAILURE';

export const UPDATE_TAGS = 'UPDATE_TAGS';
export const UPDATE_TAGS_SUCCESS = 'UPDATE_TAGS_SUCCESS';
export const UPDATE_TAGS_FAILURE = 'UPDATE_TAGS_FAILURE';

export const TAGS_EDITABLE = "TAGS_EDITABLE";
export const TAGS_TYPE = "TAGS_TYPE";

const base = "/api/transactions/";

export const addTransaction = (user, transaction) => ({
  [RSAA]: {
    types: [ADD_TRANSACTION, ADD_TRANSACTION_SUCCESS, ADD_TRANSACTION_FAILURE],
    endpoint: `${base}${user}`,
    method: 'POST',
    body: JSON.stringify(transaction),
    headers: {'Content-Type': 'application/json'},
  }
});

export const getLatestTransactions = (user) => ({
  [RSAA]: {
    types: [FETCH_TRANSACTIONS, FETCH_TRANSACTIONS_SUCCESS, FETCH_TRANSACTIONS_FAILURE],
    endpoint: `${base}${user}`,
    method: 'GET'
  }
});

export const getTransactionsFromDate = (user, date) => ({
  [RSAA]: {
    types: [FETCH_TRANSACTIONS_FROM_DATE, FETCH_TRANSACTIONS_FROM_DATE_SUCCESS, FETCH_TRANSACTIONS_FROM_DATE_FAILURE],
    endpoint: `${base}${user}?from_date=${date}`,
    method: 'GET'
  }
});

export const getTransactionsFromTranscationTime = (user, transactionTime) => ({
  [RSAA]: {
    types: [FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME, FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_SUCCESS, FETCH_TRANSACTIONS_FROM_TRANSACTION_TIME_FAILURE],
    endpoint: `${base}${user}?from_transaction_time=${transactionTime}`,
    method: 'GET'
  }
});

export const updateTags = (user, transactionTime, tags) => ({
  [RSAA]: {
    types: [{type: UPDATE_TAGS, meta: {transactionTime}}, {
      type: UPDATE_TAGS_SUCCESS,
      meta: {transactionTime, tags: tags.tags}
    }, UPDATE_TAGS_FAILURE],
    endpoint: `${base}${user}/${transactionTime}`,
    method: 'PATCH',
    body: JSON.stringify(tags),
    headers: {'Content-Type': 'application/json'},
  }
});

export const tagsEditable = transactionTime => {
  return {
    type: TAGS_EDITABLE,
    transactionTime
  }
};

export const tagsType = editedTags => {
  return {
    type: TAGS_TYPE,
    editedTags
  }
};