const config = {
  env: 'production',
  // mongo database
  mongo: {
    uri: process.env.MONGO_URI || 'localhost:27017',
    db: 'boilerplate',
  },
};

export default config;
