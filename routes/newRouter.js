const { Router }= require("express")
const router = Router()
const { messages } = require('../db')
const { body, validationResult } = require("express-validator")
const db = require('../db/queries')

router.get("/", (req, res) => {
    res.render("form") 
})
router.post(
    "/",
    [
        body("author").isLength({ min: 3 }).withMessage("Author name cannot be less than 3 characters")
    ], 
    (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { message, author } = req.body
    db.addMessage({ text: message, user: author, added: new Date() })
    res.redirect("/")
})

module.exports = router