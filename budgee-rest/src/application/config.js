import cassandra from 'cassandra-driver';
import TransactionsCassandra from '../crud/transactions/cassandra'
import Transactions from '../crud/transactions'
import UsersCassandra from '../crud/users/cassandra'
import Users from '../crud/users'

const contactPoints = ['172.17.0.2'];
const cassandraClient = new cassandra.Client({contactPoints: contactPoints, keyspace: 'budgee'});

const transactionsPersistence = new TransactionsCassandra(cassandraClient);
const transactions = new Transactions(transactionsPersistence);

const usersPersistence = new UsersCassandra(cassandraClient);
const users = new Users(usersPersistence);

export {transactions, users}
