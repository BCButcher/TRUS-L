const CryptoJS = require('crypto-js');


function encrypt(password) {
  console.log(password);
  let asalt = CryptoJS.lib.WordArray.random(128 / 8).toString();
  console.log(asalt);
  let encrypted = {
    salt: asalt,
    encrypted_password: CryptoJS.AES.encrypt(password, asalt).toString()
  };
  return encrypted;
}


function main() {
  // Test that, given a password, that it can be encrypted with a random salt and then
  // compared with that same password later to give a user access to their account.
  let testPasswords = [
    'this is a test phrase',
    'password',
    'qwerty123',
    'friendly',
    'idonotwanttobehacked'
  ];

  let encryptedTestPasswords = [];
  for (let i = 0; i < testPasswords.length; i++) {
    encryptedTestPasswords.push(encrypt(testPasswords[i]));
  }

  // Now see if we can verify a valid password
  // "password" should be true for the second test
  for (let i = 0; i < testPasswords.length; i++) {
    let password = testPasswords[i];

    let encryptedPassword = encryptedTestPasswords[i];
    let salt = encryptedPassword.salt;
    let newEncryptedPassword = CryptoJS.AES.decrypt(password, salt).toString();
    console.log('Did the user enter the correct password? ' + (encryptedPassword.encrypted_password === newEncryptedPassword));
    console.log('salt is ' + salt);
    console.log(encryptedPassword.encrypted_password);
    console.log(newEncryptedPassword);
    console.log('');
  }
}

main();
