import 'colors';
import mongoose from 'mongoose';
import EnvVars from '@src/constants/EnvVars';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(EnvVars.DbUrl);
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.bgMagenta.underline,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An error occurred, but no error message was found.');
    }
  }
};
export default connectDB;
