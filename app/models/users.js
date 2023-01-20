module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId },
        email: { type: String }
    }
    )
    const schema = mongoose.model("users", userSchema)
    return schema
}