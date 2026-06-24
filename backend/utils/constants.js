require('dotenv').config();

module.exports = {
  USER_ID: process.env.USER_ID || "anil_pathania_24062026",
  EMAIL_ID: process.env.EMAIL_ID || "anil.pathania.college@gmail.com",
  COLLEGE_ROLL_NUMBER: process.env.COLLEGE_ROLL_NUMBER || "2110990000",
  VALID_EDGE_REGEX: /^[A-Z]->[A-Z]$/
};
