export const env = {
  mongodb: {
    mongoDbConnection: process.env.MONGO_DB_CONNECTION ? process.env.MONGO_DB_CONNECTION : 'mongodb://localhost:27017'
  },
  mosquitto: {
    mosquittoHost: process.env.MOSQUITTO_HOST ? process.env.MOSQUITTO_HOST : 'mosquitto',
    mosquittoPort: process.env.MOSQUITTO_PORT ? process.env.MOSQUITTO_PORT : 1883
  },
  host: process.env.HOST ? process.env.HOST : 'localhost'
};
