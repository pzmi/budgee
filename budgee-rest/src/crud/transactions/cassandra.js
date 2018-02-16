import Log from 'log'
import cassandra from 'cassandra-driver'

const log = new Log();

const query = 'SELECT transaction_time, details, description, value, balance, tags  FROM transactions WHERE user_id=? AND transaction_time<? LIMIT ?';
const add = 'INSERT INTO transactions (user_id, transaction_time, details, description, value, tags) values (?, ?, ?, ?, ?, ?)';
const updateTags = 'UPDATE transactions SET tags=? WHERE user_id=? AND transaction_time=? IF EXISTS';
const updateBalance = 'UPDATE transactions SET balance=? WHERE user_id=? AND transaction_time=? IF EXISTS';
const addInitial = 'INSERT INTO transactions (user_id, transaction_time, balance) values (?, minTimeuuid(\'1970-01-01 00:05+0000\'), 0)';

const DEFAULT_LIMIT = 10;

export default class Cassandra {
  constructor(client) {
    this.client = client;
  }

  getTransactionsSinceDate(userId, sinceDate, limit = DEFAULT_LIMIT) {
    const transactionTime = cassandra.types.TimeUuid.fromDate(sinceDate);
    return this.getTransactions(userId, transactionTime, limit)
  }

  getTransactions(userId, mostRecentTransactionTime = cassandra.types.TimeUuid.now(), limit = DEFAULT_LIMIT) {
    return this.client.execute(query, [userId, mostRecentTransactionTime, limit], {prepare: true})
  }

  add(userId, transaction) {
    const tags = transaction.tags || [];
    const date = new Date(transaction.transaction_time);
    const timeuuid = cassandra.types.TimeUuid.fromDate(date);
    const parameters = [userId, timeuuid, transaction.details, transaction.description, transaction.value, tags];
    return this.client.execute(add, parameters, {prepare: true})
      .then(r => {
        r.rows = [{
          ...transaction, transaction_time: timeuuid
        }];
        return r;
      })
      .catch(e => Promise.reject(e));
  }

  addInitial(userId) {
    return this.client.execute(addInitial, [userId], {prepare: true})
  }

  updateTags(userId, transactionTime, tags) {
    return this.client.execute(updateTags, [tags, userId, transactionTime], {prepare: true})
  }

  updateBalance(userId, transactionTime, balance) {
    return this.client.execute(updateBalance, [balance, userId, transactionTime], {prepare: true})
  }
}
