import Log from 'log'

const log = new Log();

const create = 'INSERT INTO USERS (user_id) values (?);';


export default class Cassandra {
  constructor(client) {
    this.client = client;
  }

  create(userId) {
    return this.client.execute(create, [userId], {prepare: true})
  }
}
