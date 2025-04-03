const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: "http://localhost:3000", 
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization", 
    credentials: true, 
};

const app = express()

if (process.env.NODE_ENV !== "test") {
  connectDb();
}

const port = process.env.PORT || 5000;

app.use(cookieParser());

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use((req, res, next) => {
    console.log(`CORS middleware triggered for: ${req.method} ${req.url}`);
    next();
});
app.use(errorHandler);
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use('/api/users', require("./routes/userRoutes"));

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

module.exports = app;