import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'


export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json("User created successfully")
  } catch (error) {
    res.status(500).json(error.message)
  }

}