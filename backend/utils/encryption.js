const CryptoJS = require("crypto-js");

const SECRET_KEY = "YourSuperSecretKey"; // Change this to a strong, secret key

// Encrypt Data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt Data
const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

module.exports = { encryptData, decryptData };
