import express, { response } from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js"

connectDB()
const app = express()
app.use(cors()) // Enable Crooss-Origin Resource Sharing

// Middleware
app.use(express.json()) 
app.use(clerkMiddleware())

//API to listen to Clerk webhooks
app.use("/api/clerk",clerkWebhooks);

app.get("/", (req, res) =>res.send("API is working "))

const PORT =  3000

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
