import transactions from '../../lib/transactions'

export const TRANSACTIONS_API = Symbol('TRANSACTIONS_API');

export const GET_LATEST = "TRANSACTIONS_GET_LATEST";
export const GET_FROM_DATE = "TRANSACTIONS_GET_FROM_DATE";
export const GET_FROM_TRANSACTION_TIME = "TRANSACTIONS_GET_FROM_TRANSACTION_TIME";
export const ADD = "TRANSACTIONS_ADD";
export const UPDATE_TAGS = "TRANSACTIONS_UPDATE_TAGS";


export const SENDING = "TRANSACTIONS_GET_LATEST";
export const SUCCESS = "TRANSACTIONS_GET_LATEST";
export const ERROR = "TRANSACTIONS_GET_LATEST";

function getLatest(parameters, dispatch) {
    transactions.getLatest()
        .then(response => {
            dispatch({
                type: SUCCESS,
                response: response.body
            })
        })
        .catch(error => {
            dispatch({
                type: ERROR,
                response: error
            })
        });
}

function request(promise) {
    promise
}

const handlers = {
    GET_LATEST: getLatest,
    GET_FROM_DATE: getFromDate,

};

export default store => next => action => {
    if ( ! action[TRANSACTIONS_API] ) {
        return next(action);
    }
    let request = action[TRANSACTIONS_API];
    let {  } = request;
    let { actionType, parameters, dispatch } = store;

    dispatch({type: SENDING});

    handlers[actionType](parameters, dispatch);
};