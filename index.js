require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/dbConfig');


// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
