import request from 'superagent'

function add(user, transaction) {
    return request
        .post(`/transactions/${user}`)
        .send(transaction);
}

function getLatest(user) {
    return request
        .get(`/transactions/${user}`)
        .send()
}

function getFromDate(user, fromDate) {
    return request
        .get(`/transactions/${user}`)
        .query({from_date: fromDate})
        .send()
}

function getFromTransactionTime(user, fromTransactionTime) {
    return request
        .get(`/transactions/${user}`)
        .query({from_transaction_time: fromTransactionTime})
        .send()
}

function updateTags(user, transactionTime, tags) {
    return request
        .patch(`/transactions/${user}/${transactionTime}`)
        .send({tags: tags})
}

export default {add, getLatest, getFromDate, getFromTransactionTime, updateTags}