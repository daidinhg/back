const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Define your API routes
app.use("/api", router);

// Handle preflight requests
app.options('*', cors());

// Add a middleware to include 'Access-Control-Allow-Origin' header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
});
