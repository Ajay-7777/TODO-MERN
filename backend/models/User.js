import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },
  role: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 1
  }

});

export default mongoose.model('User', userSchema);
