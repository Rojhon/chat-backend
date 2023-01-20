const db = require("../models/index")
const Users = db.users
const mongoose = require("mongoose");

exports.listUsers = async (req, res) => {
    try {
        const users = await Users.find({})
        console.log("Data ", users)
        return res.json(users)

    } catch (error) {
        res.status(500)
    }
}

exports.getUser = async (req, res) => {
    const _id = req.params._id

    try {
        const user = await Users.findById(_id)
        return res.json(user)

    } catch (error) {
        res.status(500).send("500 - Internal Server Error")
    }
}

exports.createUser = async (req, res) => {
    const values = req.body
    const _id = new mongoose.Types.ObjectId();
    console.log("Data", values)
    console.log("Create user")

    try {
        const newUser = new Users({
            _id: _id,
            email: values.email
        })

        await newUser.save()

        return res.status(201).json(newUser)

    } catch (error) {
        res.status(500)
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