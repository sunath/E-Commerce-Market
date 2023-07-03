// Initialize the environment
require("dotenv").config()

// Initializing the application
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")


// Define the application
const app = express()


// Add global middlewares
app.use(express.json())
app.use(cors({origin:"*",allowedHeaders:"*",credentials:"*"}))
app.use(fileUpload({
    limits:"50mb"
}))

app.use('/static',express.static(path.join(process.cwd(),"assets/static")))

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
