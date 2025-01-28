const { Router }= require("express")
const router = Router()
const { messages } = require('../db')

router.get("/", (req, res) => {
    res.render("form") 
})
router.post("/", (req, res) => {
    const { message, author } = req.body
    messages.push({ text: message, user: author, added: new Date() })
    res.redirect("/")
})

module.exports = router