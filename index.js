require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/dbConfig");

// Middleware
app.use(express.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
