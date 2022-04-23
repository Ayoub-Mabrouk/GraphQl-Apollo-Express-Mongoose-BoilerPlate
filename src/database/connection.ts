import mongoose from 'mongoose';
import ENV_VARS from '../env';

const database = `mongodb+srv://${ENV_VARS.db_user}:${ENV_VARS.db_password}@${ENV_VARS.db_cluster}.mongodb.net/${ENV_VARS.db_name}?retryWrites=true&w=majority`;
const dbConnection = async () =>
  mongoose
    .connect(database)
    .then(() => {
      console.log('DB connection Successfully! 👌');
    })
    .catch((err) => {
      console.log('😕', err);
    });
export default dbConnection;
