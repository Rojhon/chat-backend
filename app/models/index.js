const mongoose = require("mongoose");
const db = {};
db.mongoose = mongoose;

db.users = require("./users")(mongoose)

module.exports = db