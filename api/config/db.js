const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // console.log(process.env.MONGODB_CONNECTION_STRING);
  //   await mongoose.connect('mongodb://127.0.0.1:27017/my_database_name', {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log('MongoDB connected successfully');
  // } catch (error) {
  //   console.error('Local MongoDB connection error:', error.message);
  //   try {
      await mongoose.connect( process.env.MONGODB_CONNECTION_STRING, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // ssl: false, 
      });
      console.log('MongoDB Atlas connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
    // process.exit(1);
  // }
};

module.exports = connectDB;