import dotenv from 'dotenv'
import connectDB from './database/connectDB.js'
import { app } from './app.js'



dotenv.config({
    path: './config/config.env'
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server running on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
});

