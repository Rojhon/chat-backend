module.exports = (mongoose) => {
    const conversationSchema = mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }],
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages"
        }]
    },
        { timestamps: true }
    )
    const schema = mongoose.model("conversations", conversationSchema)
    return schema
}