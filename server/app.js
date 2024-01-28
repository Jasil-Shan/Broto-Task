import express from "express"
import cors from 'cors'
import 'dotenv/config.js'
import { dbConnect } from "./config/dbConnect.js"


const app = express()


dbConnect()

app.use(
    cors({
        origin: [
            "http://localhost:5000",
        ],
        credentials: true,
    }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use('/', userRouter)

const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`Server listening on: 3000`);
})

