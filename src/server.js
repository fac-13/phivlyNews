const http = require('http')
// const router = require('router')
require('dotenv').config()
const key = process.env.APIKEY_NEWS
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 4000




const server = http.createServer()
server.listen(port, ()=>console.log(`Server is running on: http://${host}:${port}`))
