const mongoose = require("mongoose");
const { DB_URL } = process.env;

async function dbConnect() {
    console.log(DB_URL);
  await mongoose.connect(DB_URL);
}

module.exports = dbConnect;
