const mongoose = require("mongoose");
const db = {};
db.mongoose = mongoose;

db.users = require("./users")(mongoose)
db.conversations = require("./conversations")(mongoose)
db.messages = require("./messages")(mongoose)

module.exports = db