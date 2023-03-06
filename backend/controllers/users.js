import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
export const updateUser = async (req, res, next) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword
      },
      {
        new: true,
      },
    ).select('name email password');
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const data = await User.findById(req.user.id)
      .select('name email password');
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

// export const createUser = async (req, res, next) => {
//   try {
//     const user = new User(req.body);
//     const newUser = await user.save().select('name user');
//     return res.status(201).json(newUser);
//   } catch (err) {
//     return next(err);
//   }
// };

// export const getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find().select('name email');
//     return res.status(200).json(users);
//   } catch (err) {
//     return next(err);
//   }
// };
