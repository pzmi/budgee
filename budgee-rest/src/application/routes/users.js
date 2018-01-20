import {Router} from 'express';
import {transactions, users} from '../config'
import Log from 'log'

const log = new Log();

const router = Router();

router.post('/:user_id', addUser);

function addUser(req, res, next) {
  const userId = req.params.user_id;
  users.create(userId)
    .then(success => {
      if (success) {
        return transactions.addInitial(userId);
    } else {
        res.sendStatus(409);
    }})
    .then(() => res.sendStatus(200))
    .catch(e => next(e));
}

export default router
