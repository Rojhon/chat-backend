module.exports = (app) => {
    const chats = require("../controllers/chats")
    var router = require("express").Router()

    router.get("/get-conversations/:user_id", chats.getConversations)
    router.get("/get-conversation/:conversation_id", chats.getConversation)

    router.post("/send-message", chats.sendMessage)

    router.post("/start-conversation", chats.startConversation)

    router.delete("/delete-conversation/:conversation_id", chats.deleteConversation)

    app.use("/api/chats", router)
}