import express from "express"
import cors from 'cors'
import 'dotenv/config.js'
import { dbConnect } from "./config/dbConnect.js"
import userRouter from './routes/userRouter.js'


const app = express()


dbConnect()

app.use(
    cors({
        origin: [
            "http://localhost:5000",
            "https://brototask.netlify.app/",
        ],
        credentials: true,
    }))

app.use(express.json({}))
app.use(express.urlencoded({ extended: true }))

app.use('/', userRouter)

app.listen(3000, () => {
    console.log(`Server listening on: 3000`);
})

