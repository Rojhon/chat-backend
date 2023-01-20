module.exports = (app) => {
    const users = require("../controllers/users")
    var router = require("express").Router()

    router.get("/", users.listUsers)
    router.get("/:_id", users.getUser)

    router.post("/sign-in-user", users.signInUser)
    router.post("/sign-up-user", users.signUpUser)

    router.patch("/:_id", users.updateUser)
    router.delete("/:_id", users.deleteUser)

    app.use("/api/users", router)
}