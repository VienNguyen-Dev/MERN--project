import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import autRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path'; //cung cấp các công cụ để làm việc với đường dẫn tệp trong ứng dụng Node.js.

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connect to MongoDB successfuly!")
})
  .catch((error) => {
    console.error(error);
  })

const _dirname = path.resolve(); // lấy đường dẫn tuyệt đối của thư mục hiện tại của ứng dụng và gán cho biến _dirname. Điều này hữu ích khi cần xác định đường dẫn tuyệt đối của các tệp trong ứng dụng.

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})


app.use('/api/user', userRouter)
app.use('/api/auth', autRouter)
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(_dirname, '/client/dist')));//Điều này cho phép trình duyệt truy cập các tệp CSS, JavaScript và các tài nguyên tĩnh khác của ứng dụng một cách dễ dàng.

app.get('*', (req, res) => {
  res.sendFile(path.join(_dirname, 'client', 'dist', 'index.html'))
})


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

