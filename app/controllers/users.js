const db = require("../models/index")
const Users = db.users
const mongoose = require("mongoose");

exports.listUsers = async (req, res) => {
    try {
        const users = await Users.find({})
        console.log("Data ", users)
        return res.json(users)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getAllUsers = async (req, res) => {
    const _id = req.params._id

    try {
        const users = await Users.find({ _id: { $ne: _id } })
        return res.json(users)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}


exports.getUser = async (req, res) => {
    const _id = req.params._id

    try {
        const user = await Users.findById(_id)
        return res.json(user)

    } catch (error) {
        console.log(error)
        res.status(500).send("500 - Internal Server Error")
    }
}

exports.signInUser = async (req, res) => {
    const body = req.body

    try {
        const users = await Users.findOne({ email: body.email })

        if (users == null) {
            return res.status(400).json("Incorrect email or password.")
        }
        if (body.password == users.password) {
            return res.json({
                user_id: users.id,
                message: "Login Success!"
            })
        }
        else {
            return res.status(400).json("Incorrect email or password.")
        }

    } catch (error) {
        console.log(error)
        res.status(500).send("500 - Internal Server Error")
    }

}

exports.signUpUser = async (req, res) => {
    const body = req.body
    const _id = new mongoose.Types.ObjectId();

    try {
        const users = await Users.findOne({ email: body.email })

        if (users != null) {
            return res.status(400).json("Email already exists!")
        }
        else if (users == null) {
            const newUser = new Users({
                _id: _id,
                email: body.email,
                full_name: body.full_name,
                password: body.password
            })
            await newUser.save()

            return res.json({
                user_id: _id,
                message: "Registration Success!"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send("500 - Internal Server Error")
    }
}

exports.updateUser = async (req, res) => {
    const _id = req.params._id
    console.log("Update user")
    try {
        const users = await Users.find({})
        return res.json(users)

    } catch (error) {
        console.log(error)
    }
}

exports.deleteUser = async (req, res) => {
    const _id = req.params._id
    console.log("delete user")

    try {
        const users = await Users.find({})
        return res.json(users)

    } catch (error) {
        console.log(error)
    }
}