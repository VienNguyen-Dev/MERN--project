import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import autRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connect to MongoDB successfuly!")
})
  .catch((error) => {
    console.error(error);
  })

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})


app.use('/api/user', userRouter)
app.use('/api/auth', autRouter)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

