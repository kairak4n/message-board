const express = require("express")
const app = express()
const { messages } = require("./db")
const newRouter = require('./routes/newRouter')
require("dotenv").config()


app.use(express.urlencoded({ extended: true }));

app.use("/new", newRouter);

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Message Board", messages })
})

app.set("view engine", "ejs")
app.set("views", "./views")

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})