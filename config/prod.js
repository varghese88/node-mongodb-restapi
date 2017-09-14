process.env.NODE_ENV = 'production';
require('dotenv').config();
process.env.DB_USER_NAME = process.env.DB_PROD_USER_NAME;
process.env.DB_PASSWORD = process.env.DB_PROD_PASSWORD;
process.env.URL = process.env.PROD_URL;;
require('./../server');
