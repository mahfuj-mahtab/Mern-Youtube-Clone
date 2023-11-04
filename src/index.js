import dotenv from 'dotenv'
import connectDB from './db/connection.js';
dotenv.config()

connectDB()




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


