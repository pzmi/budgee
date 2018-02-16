import Log from "log";

const log = new Log();

export default class Transactions {
  constructor(persistence) {
    this.persistence = persistence;
  }

  static _findLastBalance(rows, start = 0) {
    for (let i = start; i < rows.length; i++) {
      if (rows[i].balance != null) {
        return i;
      }
    }

    return null;
  }

  recent(userId) {
    return this._prepareResponse(this.persistence.getTransactions(userId), userId);
  }

  _prepareResponse(promise, userId) {
    return promise
      .then(r => this._prepareBalance(r, userId))
      .catch(e => Promise.reject(e));
  }

  more(userId, lastTransactionTime) {
    return this._prepareResponse(this.persistence.getTransactions(userId, lastTransactionTime), userId);
  }

  since(userId, sinceDate) {
    return this._prepareResponse(this.persistence.getTransactionsSinceDate(userId, sinceDate), userId);
  }

  add(userId, transaction) {
    const validation = _validate(transaction);
    if (validation.result) {
      return this._prepareResponse(this.persistence.add(userId, transaction), userId);
    } else {
      return Promise.reject(
        {
          reason: "missing",
          attributes: validation.attributes
        });
    }
  }

  addInitial(userId) {
    return _booleanResponse(this.persistence.addInitial(userId));

  }

  updateTags(userId, transactionTime, tags) {
    return _booleanResponse(this.persistence.updateTags(userId, transactionTime, tags));
  }

  _prepareBalance(result, userId) {
    let rows = result.rows;
    let promise;
    if (rows.length > 0 && rows[0].balance == null) {
      return this._calculateBalance2(rows, userId);
    } else {
      promise = new Promise(resolve => resolve(rows));
    }

    return promise;
  }

  _calculateBalance2(rows, userId) {
    return this._sumUpValues(rows, userId)
      .then(balance => this._updateBalance(rows, balance, userId))
      .catch(e => Promise.reject(e));
  }

  _updateBalance(rows, balance, userId) {
    rows[0].balance = balance;
    this.persistence.updateBalance(userId, rows[0].transaction_time, rows[0].balance).catch(e => log.warning(e));
    return rows;
  }

  _sumUpValues(rows, userId) {
    let lastBalanceId = Transactions._findLastBalance(rows);

    if (lastBalanceId == null) {
      return this.persistence.getTransactions(userId, rows[rows.length - 1].transaction_time, 100)
        .then(result => {
          rows = rows.concat(result.rows);
          return this._sumUpValues(rows, userId);
        })
        .catch(e => Promise.reject(e));
    }

    let balance = +rows[lastBalanceId].balance;
    for (let i = lastBalanceId - 1; i >= 0; i--) {
      balance += +rows[i].value;
    }

    return new Promise(resolve => resolve(balance));
  }
}

const required = ['transaction_time', 'details', 'description', 'value'];

function _validate(transaction) {
  let missing = [];
  for (let i = 0; i < required.length; i++) {
    if (!transaction.hasOwnProperty(required[i])) {
      missing.push(required[i]);
    }
  }

  return {
    result: missing.length === 0,
    attributes: missing
  };
}

function _booleanResponse(promise) {
  return promise.then(r => r.wasApplied())
    .catch(e => Promise.reject(e));
}
