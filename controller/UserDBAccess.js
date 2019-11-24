let CryptoJS = require('crypto-js');
let Connection = require('../config/connection');

class UserDBAccess {
  constructor(connection) {
    if(connection === undefined) {
      this.connection = new Connection();
    }
    else {
      this.connection = connection;
    }
  }

  async getUserWithId(id) {
    let query = 'SELECT id, display_name, first_name, last_name, email, agent_id, createdAt FROM users WHERE users.id=?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async getUsers() {
    let query = 'SELECT  id, display_name, first_name, last_name, email, agent_id, createdAt from users';
    const rows = await this.connection.query(query);
    return rows;
  }

  async deleteUser(id) {
    let query = 'DELETE FROM users WHERE id=?';
    let args = [id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  async updateUser(id, newUser) {
    let query = 'UPDATE users SET display_name=?, first_name=?, last_name=?, email=? WHERE id=?';
    let args = [newUser.display_name, newUser.first_name, newUser.last_name, newUser.email, id];
    const rows = await this.connection.query(query, args);
    return rows;
  }

  // If the user's email is found, and if their entered password matches what is
  // stored, then return the id of the user. Otherwise return -1.
  async verifyPassword(email, password) {
    // First, find the user with the given email address and get their id
    let query = 'SELECT id FROM users WHERE email=?';
    let args = [email];
    let rows = await this.connection.query(query, args);

    // If no such email exists, return an empty array
    if(rows.length === 0) {
      return {user_id: -1, agent_id: null, display_name: ""};
    }

    let id = rows[0].id;
    query = 'SELECT salt, password, agent_id, display_name FROM users WHERE id=?';
    args = [id];
    rows = await this.connection.query(query, args);

    // Retrieve the salt and hashed password from the database
    let salt = rows[0].salt;
    let dbHashedPassword = rows[0].password;

    // Now with that salt, hash the new password.
    let hashedPassword = this.hashPassword(salt, password);
    
    // Does the hashed password from the database match the new password? If so, it's the same password.
    if (hashedPassword.toString() === dbHashedPassword.toString()) {
      let agent_id = (rows[0].agent_id == "null") ? null : rows[0].agent_id;
      return {user_id: id, agent_id: agent_id, display_name: rows[0].display_name};
    } else {
      return {user_id: -1, agent_id: null, display_name: ""};
    }
  }

  generateRandomSalt() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }

  hashPassword(salt, password) {
      return CryptoJS.SHA3(salt + password).toString();
  }

  isValidPassword(password, salt, dbHashedPassword) {
      let newHash = this.hashPassword(salt, password);

      return (newHash.toString() == dbHashedPassword.toString());
  }


  //  1. Post new user
  async createUser(consumerInfo, agent_id) {
    // INSERT INTO consumers (display_name, first_name, last_name, email) VALUES
    // ("Sleepless_in_Toronto", "Annie", "Reed", "anniereed@fake.com");
    let query = 'INSERT INTO users (display_name, first_name, last_name, email, salt, password, agent_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    let salt = this.generateRandomSalt();
    let hashedPassword = this.hashPassword(salt, consumerInfo.password);

    let args = [
      consumerInfo.display_name,
      consumerInfo.first_name,
      consumerInfo.last_name,
      consumerInfo.email,
      salt,
      hashedPassword,
      agent_id
    ];
    await this.connection.query(query, args);

    return await this.getLastUserCreated();
  }

  async getLastUserCreated() {
    let query = 'SELECT MAX(id) as id FROM users';
    let rows = await this.connection.query(query);
    const user_id = rows[0].id;
    rows = await this.getUserWithId(user_id);
    return rows[0];
  }



  async close() {
    await this.connect.close();
  }
}

module.exports = UserDBAccess;
