const bidHistoryRouter = require("./bidsHistory.routes");
const blogRouter = require("./blog.routes");
const contactRouter = require("./contact.routes");
const managementRouter = require("./management.routes");
const orderRouter = require("./order.routes");
const paymentRouter = require("./payment.routes");
const productsRouter = require("./product.routes");
const questionsRouter = require("./question.routes");
const subscribersRouter = require("./subscriber.routes");
const testimonialRouter = require("./testimonial.routes");
const usersRouter = require("./users.routes");
const winnerRouter = require("./winner.routes");
const WinningProductRouter = require("./winningProduct.routes");
const commentRouter = require("./comment.routes");
const todoRouter = require("./todos.routes");
const router = {
    testimonial: testimonialRouter,
    question: questionsRouter,
    winners: winnerRouter,
    management: managementRouter,
    contact: contactRouter,
    users: usersRouter,
    products: productsRouter,
    bidHistory: bidHistoryRouter,
    winningProducts: WinningProductRouter,
    orders: orderRouter,
    payment: paymentRouter,
    subscribers: subscribersRouter,
    blogs: blogRouter,
    comments: commentRouter,
    todo: todoRouter
}

module.exports = router