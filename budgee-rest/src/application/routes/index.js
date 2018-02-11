import {Router} from 'express';
import transactions from './transactions'
import users from './users'

const routes = Router();

routes.use('/transactions', transactions);
routes.use('/users', users);

export default routes;
