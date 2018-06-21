const mongoose = require('mongoose');
require('dotenv').config();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const url = `mongodb://${dbuser}:${dbpassword}@ds163630.mlab.com:63630/worldcup_2018`;
const connection = mongoose.connection;

mongoose.connect(url);

connection.on('connected', () => {
  console.log('Established connection to mongodb');
})

module.exports = mongoose;