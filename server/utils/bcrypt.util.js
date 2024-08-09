const bcrypt = require("bcrypt");

exports.compareHash = (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);

exports.createHash = (plainPassword) => bcrypt.hash(plainPassword, 10);

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// })
