import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 8000


// middleware
app.use(cors()); 
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
console.log(process.env.DB_CONNECTION_STRING) 
// routes
app.use('/api', allRoutes);

// error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
});

const connectDB = async () => {
  try {
    const MONGODB_URI=process.env.DB_CONNECTION_STRING;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
}) 
}catch (err) {
  console.log(err); 
  process.exit(1);
} 
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
