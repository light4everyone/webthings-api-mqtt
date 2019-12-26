export const env = {
  mongodb: {
    mongoDbConnection: process.env.MONGO_DB_CONNECTION ? process.env.MONGO_DB_CONNECTION : 'mongodb://localhost:27017'
  }
};
