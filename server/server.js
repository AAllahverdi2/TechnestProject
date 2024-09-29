const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const router = require('./routes/routes')

const app = express()
const PORT = process.env.PORT || 3030

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'))

app.use('/testimonial', router.testimonial)
app.use('/questions', router.question)
app.use('/winners', router.winners)
app.use('/management', router.management)
app.use('/sendEmail', router.contact)
app.use('/users', router.users)
app.use('/products', router.products)
app.use('/bidHistory', router.bidHistory)
app.use('/winningProduct', router.winningProducts)
app.use('/orders', router.orders)
app.use('/payment', router.payment)
app.use('/subscribers', router.subscribers)
app.use('/blogs', router.blogs)
app.use('/comments', router.comments)
app.use('/todo', router.todo)
app.listen(PORT, () => {
    console.log(`My app listening on Port ${PORT}`)
})

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Mongo Connected')
})