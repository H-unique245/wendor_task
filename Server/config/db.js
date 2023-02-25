const { mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set('strictQuery', true);

const Connection = mongoose.connect(process.env.DB_URL);

module.exports = { Connection };