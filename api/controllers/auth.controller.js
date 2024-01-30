import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json("User created successfully")
  } catch (error) {
    next(error)
  }
}
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandle(404), 'User not found');
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandle(401, "Wrong credential"))
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;//Dòng lệnh này thể hiện việc trích xuất dữ liệu password từ validUser._doc trong mongoDB. Truyền giá  trị của password ở trong mongoDB vào biến có tên là pass và các thành phần còn lại vào một biến có tên là "rest"
    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      rest
    })
  } catch (error) {
    next(error)
  }
}