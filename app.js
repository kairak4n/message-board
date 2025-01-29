const express = require("express")
const app = express()
const newRouter = require('./routes/newRouter')
require("dotenv").config()
const db = require('./db/queries')


app.use(express.urlencoded({ extended: true }));

app.use("/new", newRouter);

app.get("/", async (req, res) => {
    const messages = await db.getAllMessages()
    res.render("index", { title: "Mini Message Board", messages })
})

app.set("view engine", "ejs")
app.set("views", "./views")

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})