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
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at ${process.env.PORT} port`);
    })
})
.catch((err) => {
    console.log("MongoDb connection failed !!!", err)
})