const config = {
  env: 'development',
  // mongo database
  mongo: {
    uri: process.env.MONGO_URI || 'localhost',
    db: 'boilerplate',
  },
};

export default config;
