import dotenv from "dotenv"
import { app } from "./app"
dotenv.config()

const port: number = Number(process.env.PORT) || 3000

app.listen(port,()=> {
    console.log(`Listening on port ${port}...`)
})