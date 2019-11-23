let CryptoJS = require('crypto-js');
let Connection = require('../config/connection');

class UserDBAccess {
  constructor() {
    this.sqlDB = new Connection();
  }

  async getUserWithId(id) {
    let query = 'SELECT id, display_name, first_name, last_name, email, agent_id, createdAt FROM users WHERE users.id=?';
    let args = [id];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async getUsers() {
    let query = 'SELECT  id, display_name, first_name, last_name, email, agent_id, createdAt from users';
    const rows = await this.sqlDB.query(query);
    return rows;
  }

  async deleteUser(id) {
    let query = 'DELETE FROM users WHERE id=?';
    let args = [id];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async updateUser(id, newUser) {
    let query = 'UPDATE users SET display_name=?, first_name=?, last_name=?, email=? WHERE id=?';
    let args = [newUser.display_name, newUser.first_name, newUser.last_name, newUser.email, id];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  // If the user's email is found, and if their entered password matches what is
  // stored, then return the id of the user. Otherwise return -1.
  async verifyPassword(email, password) {
    // First, find the user with the given email address and get their id
    let query = 'SELECT id FROM users WHERE email=?';
    let args = [email];
    let rows = await this.sqlDB.query(query, args);

    // If no such email exists, return an empty array
    if (rows.length === 0) {
      return null;
    }

    let id = rows[0].id;
    query = 'SELECT salt, password, agent_id, display_name FROM users WHERE id=?';
    args = [id];
    rows = await this.sqlDB.query(query, args);

    // Retrieve the salt and hashed password from the database
    let salt = rows[0].salt;
    let dbHashedPassword = rows[0].password;

    // Now with that salt, hash the new password.
    let hashedPassword = this.hashPassword(salt, password);

    // Does the hashed password from the database match the new password? If so, it's the same one.
    if (hashedPassword.toString() === dbHashedPassword.toString()) {
      let agentId = (rows[0].agent_id === 'null') ? null : rows[0].agent_id;
      return { user_id: id, agent_id: agentId, display_name: rows[0].display_name };
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  generateRandomSalt() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  // eslint-disable-next-line class-methods-use-this
  hashPassword(salt, password) {
    return CryptoJS.SHA3(salt + password).toString();
  }

  isValidPassword(password, salt, dbHashedPassword) {
    let newHash = this.hashPassword(salt, password);

    return (newHash.toString() === dbHashedPassword.toString());
  }

  //  1. Post new user
  async createUser(consumerInfo) {
    // INSERT INTO consumers (display_name, first_name, last_name, email) VALUES
    // ("Sleepless_in_Toronto", "Annie", "Reed", "anniereed@fake.com");
    let query = 'INSERT INTO users (display_name, first_name, last_name, email, salt, password) VALUES (?, ?, ?, ?, ?, ?)';

    let salt = this.generateRandomSalt();
    let hashedPassword = this.hashPassword(salt, consumerInfo.password);

    let args = [
      consumerInfo.display_name,
      consumerInfo.first_name,
      consumerInfo.last_name,
      consumerInfo.email,
      salt,
      hashedPassword
    ];
    let rows = await this.sqlDB.query(query, args);

    // Number of rows affected isn't the created consumer. Return the new consumer.
    // We want to retrieve the last consumer created.
    //   1. First get the max id in the table.
    //   2. Then return the consumer with that id.
    query = 'SELECT MAX(id) as id FROM users';
    rows = await this.sqlDB.query(query);
    const id = rows[0].id;

    // TODO FIX
    // Why did I wrap this in an object under user_id????
    query = 'SELECT id, display_name, first_name, last_name, email, agent_id, createdAt FROM users WHERE id=?';
    args = [id];
    rows = await this.sqlDB.query(query, args);
    return rows[0];
  }

  async getLastUserCreated() {
    let query = 'SELECT MAX(id) as id FROM users';
    let rows = await this.sqlDB.query(query);
    const userId = rows[0].id;
    rows = await this.getUserWithId(userId);
    return rows[0];
  }

  async getBidsForUserWithId(id) {
    // SELECT * from bids where poster_id = ?
    let query = 'SELECT * from bids where poster_id = ?';
    let args = [id];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  // Called from the dashboard
  async getListingsForUser(userId) {
    let query = 'SELECT * from listings where poster_id = ?';
    let args = [userId];
    const rows = await this.sqlDB.query(query, args);
    return rows;
  }

  async close() {
    await this.db.close();
  }
}

module.exports = UserDBAccess;
