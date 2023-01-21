const db = require("../models/index")
const Users = db.users
const Conversations = db.conversations
const Messages = db.messages
const mongoose = require("mongoose");

exports.getConversations = async (req, res) => {
    const userId = req.params.user_id
    try {
        const conversation = await Conversations.find({
            participants: { $in: [userId] },
        })
            .populate("participants")
            .populate("messages")
            .sort({ updatedAt: -1 })

        return res.json(conversation)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.getConversation = async (req, res) => {
    const _id = req.params.conversation_id
    try {
        const conversation = await Conversations.findOne({ _id: _id })
            .populate("messages")
            .sort({ updatedAt: -1 })

        return res.json(conversation)

    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

exports.startConversation = async (req, res) => {
    const body = req.body
    const messageId = new mongoose.Types.ObjectId()
    const conversationId = new mongoose.Types.ObjectId()

    try {
        const messageData = new Messages({
            _id: messageId,
            user_id: body.user_id,
            content: body.content,
            unread: false,
        });

        await messageData.save()

        const conversationData = new Conversations({
            _id: conversationId,
            participants: body.participants,
            messages: [messageId],
        });

        await conversationData.save()

        return res.json("Success")
    } catch (error) {
        res.status(500).send("500 - Internal Server Error")
    }
};

exports.sendMessage = async (req, res) => {
    const body = req.body
    const messageId = new mongoose.Types.ObjectId();

    try {
        console.log(body)
        // const messageData = new Messages({
        //     _id: messageId,
        //     user_id: body.user_id,
        //     content: body.content,
        //     unread: false,
        // });
        // await messageData.save();

        // await Conversations.updateOne(
        //     { _id: body.conversation_id },
        //     { $push: { messages: messageData } }
        // );

        return res.json("Success");
    } catch (error) {
        return res.json("Error");
    }
}

exports.deleteConversation = async (req, res) => {
    const _id = req.params.conversation_id

    try {
        const conversations = await Conversations.findOne({ _id: _id })
        const messages = conversations.messages

        await Conversations.deleteOne({ _id: _id })
        await Messages.deleteMany({ _id: { $in: messages } });

        return res.json("Success");
    } catch (error) {
        res.status(500).send("500 - Internal Server Error")
    }
}