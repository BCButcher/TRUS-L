const crypto = require('crypto');
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

//main();

function test2() {
  let password = "password";
  let salt = "salt";

  let encrypted = CryptoJS.AES.encrypt(password, salt);
  let decrypted = CryptoJS.AES.decrypt(encrypted.toString(), salt);
  let encrypted2 = CryptoJS.AES.encrypt(password, salt);
  let decrypted2 = CryptoJS.AES.decrypt(encrypted2.toString(), salt);

  console.log(encrypted);
  console.log(decrypted);
  console.log(encrypted2);
  console.log(decrypted2);

  console.log("encrypted == encrypted2?");
  console.log(encrypted == encrypted2);
  console.log("decrypted == derypted2?");
  console.log(decrypted == decrypted2);

  var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
  var plaintext2 = decrypted2.toString(CryptoJS.enc.Utf8);
  console.log(plaintext);
  console.log(plaintext2);
  console.log(plaintext == plaintext2);
}

///test2();

function test3() {
  const algorithm = 'aes-128-cbc';
  let encryptMe = "password";
  
  var cipher = crypto.createCipher(algorithm, 'mypassword');
  var crypted = cipher.update(encryptMe, 'utf8', 'hex')
  crypted += cipher.final('hex');

  console.log(crypted); //34feb914c099df25794bf9ccb85bea72
}

//test3();

function generateRandomSalt() {
  return CryptoJS.lib.WordArray.random(128 / 8).toString();
}

function hashPassword(salt, password) {
  return CryptoJS.SHA3(salt + password);
}

function isValidPassword() {

}

function test4() {
  let testPassword = [
    'password',
    'password',
    'password',
    'password',
    'password',
    'password',
    'password',
    'password'
  ];

  let testSalt = [];
  for (let i = 0; i < testPassword.length; i++) {
    testSalt.push(generateRandomSalt());
    console.log(testSalt[i]);
  }

  let hashedPassword = [];
  for (let i = 0; i < testPassword.length; i++) {
    hashedPassword.push(hashPassword(testSalt[i], testPassword[i]));
  }

  let passwordPass = [];
  console.log("");
  for (let i = 0; i < testPassword.length; i++) {
    // Try to hash it again, see if it's the same
    let newHash = hashPassword(testSalt[i], testPassword[i]);
    console.log(testSalt[i]);
    console.log(newHash.toString());

    let recognized = (newHash.toString() == hashedPassword[i].toString());
    console.log("was password recognized? " + recognized);
    if(!recognized) {
      console.log("             newHash is " + newHash);
      console.log("stored password hash is " + hashedPassword[i]);
      console.log(newHash);
      console.log(hashedPassword[i]);
      console.log("");
    }
  }
}

//test4();


function test5(password) {
  // Before migrating the dbAccess to this technique, check that it works.

  // Pretend that we load the hashed password and the salt from the database
  let passwordSalt = "d512dc906ded86ba323632e26858ef85";
  let dbPasswordHash = "b0ba031e04b9fcf34270cdd6280a3bc80f6d6cfe6a0b3e1e14f574ab8d740298ca33589f6459eba2c38e29d943794c5262d58f238ba4c08e30235760b627cb21";

  let newHash = hashPassword(passwordSalt, password);

  let recognized = (newHash.toString() == dbPasswordHash.toString());
  console.log("do passwords match? " + recognized);
}

test5("password");
