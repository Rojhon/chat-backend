module.exports = (mongoose) => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb+srv://rojhonbb:0YeYksDng9iOfpQI@cluster0.ujpca.mongodb.net/Chat",
        { useNewUrlParser: true, useUnifiedTopology: true })

    const db = mongoose.connection

    db.on("error", ((error) => console.log(error)))
    db.once("open", (() => console.log("Connected to Database")))
}