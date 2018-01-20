import Log from "log";

const log = new Log();

export default class Users {
  constructor(persistence) {
    this.persistence = persistence;
  }

  create(userId) {
    return this.persistence.create(userId)
      .then(r => r.wasApplied())
      .catch(e => Promise.reject(e));
  }

}
