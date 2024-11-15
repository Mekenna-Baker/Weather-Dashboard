import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes


const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder //



// TODO: Implement middleware for parsing JSON and urlencoded form data //



// TODO: Implement middleware to connect the routes //



// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
