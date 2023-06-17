// Initialize the environment
require("dotenv").config()

// Initializing the application
const express = require("express")




// Define the application
const app = express()


// Add global middlewares
app.use(express.json())

// Initialize the mongo db 
const mongodb = require("mongoose")
mongodb.connect(process.env.MONGODB)



// Setting routes
const routes = require("./routers")

const routeCount  = Object.keys(routes).length

for (let i = 0 ; i < routeCount;i++){
    // console.log(`/${Object.keys(routes)[i]}`,routes[Object.keys(routes)[i]])
    app.use(`/${Object.keys(routes)[i]}`,routes[Object.keys(routes)[i]])
}


// Host the application
const port = process.env.PORT || 8000
app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})
