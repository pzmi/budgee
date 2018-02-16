import {Router} from 'express';
import {transactions} from '../config'
import Log from 'log'

const log = new Log();

const router = Router();

router
  .route('/:user_id')
  .get(queryTransactions)
  .post(addTransaction);

router.patch('/:user_id/:transaction_time', updateTags);

function addTransaction(req, res, next) {
  log.info(req.body);
  transactions.add(req.params.user_id, req.body)
    .then(r => respond(r, req, res))
    .catch(e => {
      log.info(e);

      if (e.reason === "missing") {
        res.status(400).json(e);
      } else {
        next(e);
      }
    })
}

function queryTransactions(req, res, next) {
  let promise;
  const userId = req.params.user_id;
  if (req.query.from_date != null) {
    promise = transactions.since(userId, new Date(req.query.from_date))
  } else if (req.query.from_transaction_time != null) {
    promise = transactions.more(userId, req.query.from_transaction_time)
  } else {
    promise = transactions.recent(userId)
  }

  promise.then(result => respond(result, req, res))
    .catch(e => next(e))
}

function updateTags(req, res, next) {
  if (req.body.hasOwnProperty('tags')) {
    transactions.updateTags(req.params.user_id, req.params.transaction_time, req.body.tags)
      .then(result => {
        if (result) {
          res.sendStatus(200);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(e => next(e));
  } else {
    res.sendStatus(400);
  }
}

function toReadableDateTime(r) {
  r.transaction_time_date = r.transaction_time.getDate();
  return r;
}

function respond(rows, req, res) {
  if (rows.length > 0) {
    const transformed = rows.map(r => toReadableDateTime(r));
    res.json(transformed);
  } else {
    res.sendStatus(404);
  }
}

export default router
