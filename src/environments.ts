export const env = {
  mongodb: {
    mongoDbConnection: process.env.MONGO_DB_CONNECTION ? process.env.MONGO_DB_CONNECTION : 'mongodb://localhost:27017'
  },
  mosquitto: {
    mosquittoUrl: process.env.MOSQUITTO_URL ? process.env.MOSQUITTO_URL : 'mqtt://localhost'
  },
  host: process.env.HOST ? process.env.HOST : 'localhost',
  port: process.env.PORT ? +process.env.PORT : 8888
};
