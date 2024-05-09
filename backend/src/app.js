// Configure environment variables
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import { run } from './data/init-db.js'
// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

// Configure middleware (logging, CORS support, JSON parsing support, static files support)
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Import and use our application routes.
import routes from "./routes/routes.js";
app.use("/", routes);

await mongoose.connect(process.env.MONGODB_URL);

/*function startScheduledTasks() {
    run().then(() => {
        console.log('Initial database setup complete.');
    }).catch(error => {
        console.error('Failed to initialize the database on schedule:', error);
    });

    setInterval(() => {
        run().then(() => {
            console.log('Scheduled database refresh complete.');
        }).catch(error => {
            console.error('Failed to refresh the database:', error);
        });
    }, 24* 60 *60 * 1000);  // every 24 hours
}*/


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    //startScheduledTasks();  
});