module.exports = (app) => {
    require("./users")(app)
    require("./chats")(app)
}