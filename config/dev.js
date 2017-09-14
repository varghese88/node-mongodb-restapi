require('dotenv').config();
process.env.NODE_ENV = 'development';
process.env.DB_USER_NAME = process.env.DB_DEV_USER_NAME;
process.env.DB_PASSWORD = process.env.DB_DEV_PASSWORD;
process.env.URL = process.env.DEV_URL;
require('./../server');