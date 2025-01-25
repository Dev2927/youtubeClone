import { app } from './app.js'
import connectDB from './db/index.js'
import dotenv from 'dotenv'

dotenv.config({
    path: './env'
})

connectDB()
.then( () => {
    app.on('error', erorr => {
        console.log('Something went wrong', erorr)
    })
    app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
        console.log(`Backend running on http://0.0.0.0:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDb connection failed !!!", err)
})