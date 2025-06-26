const express = require("express")
const { handleNewMail } = require("../controller/contact")

const route = express.Router()

route.post("/",handleNewMail)



module.exports = route