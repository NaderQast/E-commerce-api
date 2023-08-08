const express = require('express')
const connectDB = require('./src/config/db')
const UserRoutes = require('./src/Routes/user')
const AuthRoutes = require('./src/Routes/auth')
const productRoutes = require('./src/Routes/Products')
const ordersRoutes = require('./src/Routes/orders')
const cartRoutes = require('./src/Routes/cart')
require('./src/config/db')

const app = express()

require('dotenv').config()

app.use(express.json())

const port = process.env.PORT

connectDB()


app.use("/api/users", UserRoutes)
app.use("/api/auth", AuthRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/carts", cartRoutes)

app.listen(port ,() => {
console.log('server is up on port '+ port )} )

module.exports = app 