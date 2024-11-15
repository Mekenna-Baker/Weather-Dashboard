import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Import the routes


const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder //

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../client/dist')));



// TODO: Implement middleware for parsing JSON and urlencoded form data //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the routes //

import routes from './routes/index.js';
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
