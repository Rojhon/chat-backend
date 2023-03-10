module.exports = (mongoose) => {
    const messageSchema = mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        content: { type: String },
        unread: { type: Boolean }
    },
        { timestamps: true }
    )
    const schema = mongoose.model("messages", messageSchema)
    return schema
}