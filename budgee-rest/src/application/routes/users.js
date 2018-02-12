import {Router} from 'express';
import {transactions, users} from '../config'
import Log from 'log'

const log = new Log();

const router = Router();

router.route('/:user_id')
  .get(getUser)
  .post(addUser);

function getUser(req, res, next) {
  const userId = req.params.user_id;
  users.get(userId)
    .then(r => {
      if (r.length > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(e => next(e));
}

function addUser(req, res, next) {
  const userId = req.params.user_id;
  users.create(userId)
    .then(success => {
      if (success) {
        return transactions.addInitial(userId);
      } else {
        res.sendStatus(409);
      }
    })
    .then(() => res.sendStatus(200))
    .catch(e => next(e));
}

export default router
