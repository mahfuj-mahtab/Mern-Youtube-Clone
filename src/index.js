import dotenv from 'dotenv'
import connectDB from './db/connection.js';
import { app } from './app.js';
dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log('Server started!');
    })
})
.catch((err)=>{
    console.log('mongo db connection failed ', err);
})

// app.listen(8000,()=>{
//     console.log('server started');
    
// })


// one approach to connect db
// const app = express()
// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log('Err : ',error);
//             throw error

//         })
//         app.listen(process.env.PPORT,()=>{
//             console.log('app is listening');
//         })
//     } catch (error) {
//         console.log('db connection',error)
//     }
// })()


