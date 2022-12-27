require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/dbConfig');


// Connect to database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
